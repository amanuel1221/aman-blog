import {
  useEffect,
  useRef,
  useState,
} from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  Editor,
  commandsCtx,
  defaultValueCtx,
  editorViewCtx,
  rootCtx,
} from "@milkdown/kit/core";

import {
  redo,
  undo,
} from "@milkdown/kit/prose/history";

import {
  commonmark,
  createCodeBlockCommand,
  insertHrCommand,
  insertImageCommand,
  toggleEmphasisCommand,
  toggleInlineCodeCommand,
  toggleStrongCommand,
  toggleLinkCommand,
  turnIntoTextCommand,
  wrapInBlockquoteCommand,
  wrapInBulletListCommand,
  wrapInHeadingCommand,
  wrapInOrderedListCommand,
} from "@milkdown/kit/preset/commonmark";

import {
  gfm,
  toggleStrikethroughCommand,
} from "@milkdown/kit/preset/gfm";

import {
  listener,
  listenerCtx,
} from "@milkdown/kit/plugin/listener";

import { history } from "@milkdown/kit/plugin/history";

import {
  Milkdown,
  MilkdownProvider,
  useEditor,
  useInstance,
} from "@milkdown/react";

import { uploadContentImage } from "../../api/imageApi";

import "@milkdown/kit/prose/view/style/prosemirror.css";


/* =========================================================
   Toolbar Button
========================================================= */

const ToolbarButton = ({
  children,
  title,
  onClick,
  onMouseDown,
  disabled = false,
  active = false,
}) => {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={onMouseDown}
      onClick={onClick}
      className={`
        inline-flex
        h-9
        min-w-9
        cursor-pointer
        select-none
        items-center
        justify-center
        rounded-md
        px-2
        text-sm
        font-medium
        transition-colors
        duration-150

        ${
          active
            ? "bg-slate-800 text-white hover:bg-slate-700"
            : "text-slate-600 hover:bg-slate-200 hover:text-slate-900 active:bg-slate-300"
        }

        disabled:cursor-not-allowed
        disabled:opacity-40
      `}
    >
      {children}
    </button>
  );
};


/* =========================================================
   Toolbar Divider
========================================================= */

const ToolbarDivider = () => {
  return (
    <div
      aria-hidden="true"
      className="mx-1 h-6 w-px bg-slate-200"
    />
  );
};


/* =========================================================
   Editor Toolbar
========================================================= */

const EditorToolbar = ({
  savedSelectionRef,
}) => {
  const [isLoading, getInstance] =
    useInstance();

  const [editorState, setEditorState] =
    useState(null);

  const imageInputRef =
    useRef(null);


  /* =======================================================
     Update Toolbar State
  ======================================================= */

  const updateEditorState = (
    view
  ) => {
    if (!view) return;

    const { state } = view;

    const { from } =
      state.selection;

    const resolvedPosition =
      state.doc.resolve(from);

    const marks =
      state.storedMarks ||
      resolvedPosition.marks();

    const activeMarks =
      new Set(
        marks.map(
          (mark) => mark.type.name
        )
      );

    const parentNode =
      resolvedPosition.parent;

    const parentNodeName =
      parentNode?.type?.name;


    /*
     * Check whether the current
     * position is inside a list.
     */

    let bulletList = false;
    let orderedList = false;
    let blockquote = false;


    for (
      let depth = resolvedPosition.depth;
      depth > 0;
      depth--
    ) {
      const node =
        resolvedPosition.node(depth);

      const nodeName =
        node?.type?.name;

      if (
        nodeName === "bullet_list"
      ) {
        bulletList = true;
      }

      if (
        nodeName === "ordered_list"
      ) {
        orderedList = true;
      }

      if (
        nodeName === "blockquote"
      ) {
        blockquote = true;
      }
    }


    setEditorState({
      strong:
        activeMarks.has("strong"),

      emphasis:
        activeMarks.has("emphasis"),

      strikeThrough:
        activeMarks.has(
          "strike_through"
        ) ||
        activeMarks.has(
          "strikethrough"
        ),

      inlineCode:
        activeMarks.has(
          "inline_code"
        ) ||
        activeMarks.has("code"),

      link:
        activeMarks.has("link"),

      heading:
        parentNodeName === "heading"
          ? parentNode.attrs.level
          : null,

      bulletList,

      orderedList,

      blockquote,

      codeBlock:
        parentNodeName ===
        "code_block",
    });
  };


  /* =======================================================
     Subscribe To Editor Changes
  ======================================================= */

  useEffect(() => {
    if (isLoading) return;

    const editor =
      getInstance();

    if (!editor) return;

    let cleanup = null;

    editor.action((ctx) => {
      const view =
        ctx.get(editorViewCtx);

      updateEditorState(view);


      const handleUpdate = () => {
        updateEditorState(view);
      };


      view.dom.addEventListener(
        "keyup",
        handleUpdate
      );

      view.dom.addEventListener(
        "mouseup",
        handleUpdate
      );

      view.dom.addEventListener(
        "input",
        handleUpdate
      );


      cleanup = () => {
        view.dom.removeEventListener(
          "keyup",
          handleUpdate
        );

        view.dom.removeEventListener(
          "mouseup",
          handleUpdate
        );

        view.dom.removeEventListener(
          "input",
          handleUpdate
        );
      };
    });


    return () => {
      cleanup?.();
    };
  }, [
    isLoading,
    getInstance,
  ]);


  /* =======================================================
     Preserve Selection
  ======================================================= */

  const preserveSelection = () => {
    if (isLoading) return;

    const editor =
      getInstance();

    if (!editor) return;

    editor.action((ctx) => {
      const view =
        ctx.get(editorViewCtx);

      savedSelectionRef.current =
        view.state.selection;

      updateEditorState(view);

      view.focus();
    });
  };


  /* =======================================================
     Run Milkdown Command
  ======================================================= */

  const runCommand = (
    command,
    payload
  ) => {
    if (isLoading) return;

    const editor =
      getInstance();

    if (!editor) return;

    editor.action((ctx) => {
      const view =
        ctx.get(editorViewCtx);

      const commands =
        ctx.get(commandsCtx);


      /* -----------------------------------------------
         Restore previous selection
      ----------------------------------------------- */

      if (
        savedSelectionRef.current
      ) {
        const transaction =
          view.state.tr.setSelection(
            savedSelectionRef.current
          );

        view.dispatch(
          transaction
        );
      }


      /* -----------------------------------------------
         Focus
      ----------------------------------------------- */

      view.focus();


      /* -----------------------------------------------
         Execute command
      ----------------------------------------------- */

      commands.call(
        command.key,
        payload
      );


      /* -----------------------------------------------
         Update toolbar state
      ----------------------------------------------- */

      updateEditorState(view);
    });
  };


  /* =======================================================
     Link
  ======================================================= */

  const addLink = () => {
    if (isLoading) return;

    const url =
      window.prompt(
        "Enter the URL:",
        "https://"
      );

    if (
      !url ||
      url === "https://"
    ) {
      return;
    }

    runCommand(
      toggleLinkCommand,
      {
        href: url.trim(),
      }
    );
  };


  /* =======================================================
     Open Image Picker
  ======================================================= */

  const openImagePicker = () => {
    if (isLoading) return;

    preserveSelection();

    imageInputRef.current?.click();
  };


  /* =======================================================
     Image Upload
  ======================================================= */

  const handleImageUpload = async (
    event
  ) => {
    const file =
      event.target.files?.[0];


    /*
     * Reset input so the same image
     * can be selected again.
     */

    event.target.value = "";


    if (!file) return;


    /* -----------------------------------------------------
       Validate File Type
    ----------------------------------------------------- */

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (
      !allowedTypes.includes(
        file.type
      )
    ) {
      window.alert(
        "Please select a JPG, JPEG, PNG, or WebP image."
      );

      return;
    }


    /* -----------------------------------------------------
       Validate File Size
    ----------------------------------------------------- */

    const maxFileSize =
      5 * 1024 * 1024;

    if (
      file.size > maxFileSize
    ) {
      window.alert(
        "Image must be smaller than 5 MB."
      );

      return;
    }


    try {

      /* ===================================================
         Upload Image
      =================================================== */

      const response =
        await uploadContentImage(
          file
        );


      /* ===================================================
         Get Cloudinary URL
      =================================================== */

      const imageUrl =
        response.data?.image?.url;


      if (!imageUrl) {
        throw new Error(
          "Image URL was not returned by the server."
        );
      }


      /* ===================================================
         Get Milkdown Instance
      =================================================== */

      const editor =
        getInstance();


      if (!editor) {
        throw new Error(
          "Editor instance is not available."
        );
      }


      editor.action((ctx) => {

        const view =
          ctx.get(editorViewCtx);

        const commands =
          ctx.get(commandsCtx);


        /* -----------------------------------------------
           Restore Selection
        ----------------------------------------------- */

        if (
          savedSelectionRef.current
        ) {
          const transaction =
            view.state.tr.setSelection(
              savedSelectionRef.current
            );

          view.dispatch(
            transaction
          );
        }


        /* -----------------------------------------------
           Focus Editor
        ----------------------------------------------- */

        view.focus();


        /* -----------------------------------------------
           Insert Real Milkdown Image
        ----------------------------------------------- */

        commands.call(
          insertImageCommand.key,
          {
            src: imageUrl,
            alt: file.name,
            title: file.name,
          }
        );


        view.focus();

        updateEditorState(view);
      });

    } catch (error) {

      console.error(
        "Image upload failed:",
        error
      );


      const message =
        error.response?.data?.message ||
        error.message ||
        "Image upload failed.";


      window.alert(message);
    }
  };


  return (
    <div
      className="
        sticky
        top-0
        z-10
        flex
        min-h-12
        flex-wrap
        items-center
        gap-1
        border-b
        border-slate-200
        bg-slate-50
        px-3
        py-2
      "
    >

      {/* =================================================
          Hidden Image Input
      ================================================= */}

      <input
        ref={imageInputRef}
        type="file"
        accept="
          image/jpeg,
          image/jpg,
          image/png,
          image/webp
        "
        className="hidden"
        onChange={
          handleImageUpload
        }
      />


      {/* =================================================
          Bold
      ================================================= */}

      <ToolbarButton
        title="Bold — Ctrl+B"
        disabled={isLoading}
        active={
          editorState?.strong
        }
        onMouseDown={(event) => {
          event.preventDefault();
          preserveSelection();
        }}
        onClick={() => {
          runCommand(
            toggleStrongCommand
          );
        }}
      >
        <strong className="text-base">
          B
        </strong>
      </ToolbarButton>


      {/* =================================================
          Italic
      ================================================= */}

      <ToolbarButton
        title="Italic — Ctrl+I"
        disabled={isLoading}
        active={
          editorState?.emphasis
        }
        onMouseDown={(event) => {
          event.preventDefault();
          preserveSelection();
        }}
        onClick={() => {
          runCommand(
            toggleEmphasisCommand
          );
        }}
      >
        <em className="text-base">
          I
        </em>
      </ToolbarButton>


      {/* =================================================
          Strikethrough
      ================================================= */}

      <ToolbarButton
        title="Strikethrough"
        disabled={isLoading}
        active={
          editorState?.strikeThrough
        }
        onMouseDown={(event) => {
          event.preventDefault();
          preserveSelection();
        }}
        onClick={() => {
          runCommand(
            toggleStrikethroughCommand
          );
        }}
      >
        <span className="line-through font-semibold">
          S
        </span>
      </ToolbarButton>


      {/* =================================================
          Inline Code
      ================================================= */}

      <ToolbarButton
        title="Inline Code"
        disabled={isLoading}
        active={
          editorState?.inlineCode
        }
        onMouseDown={(event) => {
          event.preventDefault();
          preserveSelection();
        }}
        onClick={() => {
          runCommand(
            toggleInlineCodeCommand
          );
        }}
      >
        <span className="font-mono text-xs font-semibold">
          {"</>"}
        </span>
      </ToolbarButton>


      <ToolbarDivider />


      {/* =================================================
          Heading 1
      ================================================= */}

      <ToolbarButton
        title="Heading 1"
        disabled={isLoading}
        active={
          editorState?.heading === 1
        }
        onMouseDown={(event) => {
          event.preventDefault();
          preserveSelection();
        }}
        onClick={() => {
          runCommand(
            wrapInHeadingCommand,
            1
          );
        }}
      >
        <span className="font-bold">
          H1
        </span>
      </ToolbarButton>


      {/* =================================================
          Heading 2
      ================================================= */}

      <ToolbarButton
        title="Heading 2"
        disabled={isLoading}
        active={
          editorState?.heading === 2
        }
        onMouseDown={(event) => {
          event.preventDefault();
          preserveSelection();
        }}
        onClick={() => {
          runCommand(
            wrapInHeadingCommand,
            2
          );
        }}
      >
        <span className="font-bold">
          H2
        </span>
      </ToolbarButton>


      {/* =================================================
          Heading 3
      ================================================= */}

      <ToolbarButton
        title="Heading 3"
        disabled={isLoading}
        active={
          editorState?.heading === 3
        }
        onMouseDown={(event) => {
          event.preventDefault();
          preserveSelection();
        }}
        onClick={() => {
          runCommand(
            wrapInHeadingCommand,
            3
          );
        }}
      >
        <span className="font-bold">
          H3
        </span>
      </ToolbarButton>


      <ToolbarDivider />


      {/* =================================================
          Bullet List
      ================================================= */}

      <ToolbarButton
        title="Bullet List"
        disabled={isLoading}
        active={
          editorState?.bulletList
        }
        onMouseDown={(event) => {
          event.preventDefault();
          preserveSelection();
        }}
        onClick={() => {
          runCommand(
            wrapInBulletListCommand
          );
        }}
      >
        <span className="flex items-center gap-1">
          <span className="text-base">
            •
          </span>

          <span className="text-xs">
            ☰
          </span>
        </span>
      </ToolbarButton>


      {/* =================================================
          Numbered List
      ================================================= */}

      <ToolbarButton
        title="Numbered List"
        disabled={isLoading}
        active={
          editorState?.orderedList
        }
        onMouseDown={(event) => {
          event.preventDefault();
          preserveSelection();
        }}
        onClick={() => {
          runCommand(
            wrapInOrderedListCommand
          );
        }}
      >
        <span className="text-xs font-bold">
          1.
        </span>
      </ToolbarButton>


      <ToolbarDivider />


      {/* =================================================
          Blockquote
      ================================================= */}

      <ToolbarButton
        title="Blockquote"
        disabled={isLoading}
        active={
          editorState?.blockquote
        }
        onMouseDown={(event) => {
          event.preventDefault();
          preserveSelection();
        }}
        onClick={() => {
          runCommand(
            wrapInBlockquoteCommand
          );
        }}
      >
        <span className="text-lg font-serif">
          "
        </span>
      </ToolbarButton>


      {/* =================================================
          Code Block
      ================================================= */}

      <ToolbarButton
        title="Code Block"
        disabled={isLoading}
        active={
          editorState?.codeBlock
        }
        onMouseDown={(event) => {
          event.preventDefault();
          preserveSelection();
        }}
        onClick={() => {
          runCommand(
            createCodeBlockCommand
          );
        }}
      >
        <span className="font-mono text-xs font-bold">
          {"{}"}
        </span>
      </ToolbarButton>


      {/* =================================================
          Horizontal Rule
      ================================================= */}

      <ToolbarButton
        title="Horizontal Rule"
        disabled={isLoading}
        onMouseDown={(event) => {
          event.preventDefault();
          preserveSelection();
        }}
        onClick={() => {
          runCommand(
            insertHrCommand
          );
        }}
      >
        <span className="text-lg">
          ―
        </span>
      </ToolbarButton>


      <ToolbarDivider />


      {/* =================================================
          Link
      ================================================= */}

      <ToolbarButton
        title="Insert Link"
        disabled={isLoading}
        active={
          editorState?.link
        }
        onMouseDown={(event) => {
          event.preventDefault();
          preserveSelection();
        }}
        onClick={addLink}
      >
        <span className="text-base">
          🔗
        </span>
      </ToolbarButton>


      {/* =================================================
          Image
      ================================================= */}

      <ToolbarButton
        title="Insert Image"
        disabled={isLoading}
        onMouseDown={(event) => {
          event.preventDefault();
          preserveSelection();
        }}
        onClick={
          openImagePicker
        }
      >
        <span className="text-base">
          🖼️
        </span>
      </ToolbarButton>


      <ToolbarDivider />


      {/* =================================================
          Normal Text
      ================================================= */}

      <ToolbarButton
        title="Normal Text"
        disabled={isLoading}
        onMouseDown={(event) => {
          event.preventDefault();
          preserveSelection();
        }}
        onClick={() => {
          runCommand(
            turnIntoTextCommand
          );
        }}
      >
        <span className="font-serif text-base font-semibold">
          T
        </span>
      </ToolbarButton>


      <ToolbarDivider />


      {/* =================================================
          Undo
      ================================================= */}

      <ToolbarButton
        title="Undo — Ctrl+Z"
        disabled={isLoading}
        onMouseDown={(event) => {
          event.preventDefault();
          preserveSelection();
        }}
        onClick={() => {

          const editor =
            getInstance();

          if (!editor) return;


          editor.action((ctx) => {

            const view =
              ctx.get(editorViewCtx);


            view.focus();


            undo(
              view.state,
              view.dispatch
            );


            updateEditorState(
              view
            );
          });
        }}
      >
        <span className="text-lg">
          ↶
        </span>
      </ToolbarButton>


      {/* =================================================
          Redo
      ================================================= */}

      <ToolbarButton
        title="Redo — Ctrl+Y"
        disabled={isLoading}
        onMouseDown={(event) => {
          event.preventDefault();
          preserveSelection();
        }}
        onClick={() => {

          const editor =
            getInstance();

          if (!editor) return;


          editor.action((ctx) => {

            const view =
              ctx.get(editorViewCtx);


            view.focus();


            redo(
              view.state,
              view.dispatch
            );


            updateEditorState(
              view
            );
          });
        }}
      >
        <span className="text-lg">
          ↷
        </span>
      </ToolbarButton>

    </div>
  );
};


/* =========================================================
   Editor Content
========================================================= */

const EditorContent = ({
  value,
  onChange,
}) => {

  const onChangeRef =
    useRef(onChange);


  useEffect(() => {
    onChangeRef.current =
      onChange;
  }, [onChange]);


  useEditor((root) => {

    return Editor.make()

      .config((ctx) => {

        /* -----------------------------------------------
           Editor root
        ----------------------------------------------- */

        ctx.set(
          rootCtx,
          root
        );


        /* -----------------------------------------------
           Initial Markdown
        ----------------------------------------------- */

        ctx.set(
          defaultValueCtx,
          value || ""
        );


        /* -----------------------------------------------
           Markdown change listener
        ----------------------------------------------- */

        ctx.get(
          listenerCtx
        ).markdownUpdated(
          (
            ctx,
            markdown,
            prevMarkdown
          ) => {

            if (
              markdown !==
              prevMarkdown
            ) {
              onChangeRef.current(
                markdown
              );
            }
          }
        );
      })


      /* -----------------------------------------------
         CommonMark
      ----------------------------------------------- */

      .use(commonmark)


      /* -----------------------------------------------
         GitHub Flavored Markdown
      ----------------------------------------------- */

      .use(gfm)


      /* -----------------------------------------------
         Markdown Listener
      ----------------------------------------------- */

      .use(listener)


      /* -----------------------------------------------
         Undo / Redo
      ----------------------------------------------- */

      .use(history);
  });


  return (
    <div className="markdown-editor-content">
      <Milkdown />
    </div>
  );
};


/* =========================================================
   Markdown Preview
========================================================= */

const MarkdownPreview = ({
  value,
}) => {

  const hasContent =
    value.trim().length > 0;


  if (!hasContent) {
    return (
      <div
        className="
          markdown-preview-empty
          flex
          min-h-[600px]
          items-center
          justify-center
          bg-white
          px-6
          py-12
          text-sm
          text-slate-400
        "
      >
        Nothing to preview yet.
      </div>
    );
  }


  return (
    <div
      className="
        markdown-preview-wrapper
        min-h-[600px]
        bg-white
      "
    >

      <article
        className="
          markdown-preview
          mx-auto
          max-w-4xl
          px-8
          py-8
        "
      >

        <ReactMarkdown
          remarkPlugins={[
            remarkGfm,
          ]}
        >
          {value}
        </ReactMarkdown>

      </article>

    </div>
  );
};


/* =========================================================
   Main Markdown Editor
========================================================= */

const MarkdownEditor = ({
  value = "",
  onChange,
}) => {

  const [activeTab, setActiveTab] =
    useState("write");


  const savedSelectionRef =
    useRef(null);


  return (
    <MilkdownProvider>

      {/* =================================================
          Write / Preview Tabs
      ================================================= */}

      <div
        className="
          flex
          border-b
          border-slate-200
          bg-white
        "
      >

        <button
          type="button"
          onClick={() =>
            setActiveTab("write")
          }
          className={`
            border-b-2
            px-5
            py-3
            text-sm
            font-medium
            transition-colors
            duration-150

            ${
              activeTab === "write"
                ? "border-slate-900 bg-slate-50 text-slate-900"
                : "border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            }
          `}
        >
          Write
        </button>


        <button
          type="button"
          onClick={() =>
            setActiveTab("preview")
          }
          className={`
            border-b-2
            px-5
            py-3
            text-sm
            font-medium
            transition-colors
            duration-150

            ${
              activeTab === "preview"
                ? "border-slate-900 bg-slate-50 text-slate-900"
                : "border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            }
          `}
        >
          Preview
        </button>

      </div>


      {/* =================================================
          WRITE MODE

          IMPORTANT:
          The editor stays mounted.

          We only hide/show it.

          This prevents Milkdown from being
          destroyed when switching to Preview.
      ================================================= */}

      <div
        className={
          activeTab === "write"
            ? "block"
            : "hidden"
        }
      >

        <EditorToolbar
          savedSelectionRef={
            savedSelectionRef
          }
        />


        <EditorContent
          value={value}
          onChange={onChange}
        />

      </div>


      {/* =================================================
          PREVIEW MODE

          Preview is rendered from the exact
          Markdown string stored in `value`.
      ================================================= */}

      <div
        className={
          activeTab === "preview"
            ? "block"
            : "hidden"
        }
      >

        <MarkdownPreview
          value={value}
        />

      </div>


      {/* =================================================
          Styling
      ================================================= */}

      <style>
        {`

          /* =================================================
             Editor Container
          ================================================= */

          .markdown-editor-content
            .milkdown {

            width: 100%;

            background:
              white;
          }


          /* =================================================
             Main Editor
          ================================================= */

          .markdown-editor-content
            .milkdown
            .editor {

            min-height:
              600px;

            max-height:
              900px;

            overflow-y:
              auto;

            padding:
              28px
              32px
              80px;

            outline:
              none;

            cursor:
              text;

            user-select:
              text;

            -webkit-user-select:
              text;

            font-size:
              16px;

            line-height:
              1.75;

            color:
              #0f172a;
          }


          /* =================================================
             ProseMirror
          ================================================= */

          .markdown-editor-content
            .ProseMirror {

            min-height:
              520px;

            outline:
              none;

            cursor:
              text;

            user-select:
              text;

            -webkit-user-select:
              text;
          }


          /* =================================================
             Paragraph
          ================================================= */

          .markdown-editor-content
            .ProseMirror
            p {

            margin:
              0 0 1rem;
          }


          /* =================================================
             Headings
          ================================================= */

          .markdown-editor-content
            .ProseMirror
            h1 {

            margin:
              1.8rem 0 1rem;

            font-size:
              2rem;

            line-height:
              1.2;

            font-weight:
              700;
          }


          .markdown-editor-content
            .ProseMirror
            h2 {

            margin:
              1.6rem 0 0.8rem;

            font-size:
              1.5rem;

            line-height:
              1.3;

            font-weight:
              700;
          }


          .markdown-editor-content
            .ProseMirror
            h3 {

            margin:
              1.4rem 0 0.7rem;

            font-size:
              1.25rem;

            line-height:
              1.35;

            font-weight:
              700;
          }


          /* =================================================
             Lists
          ================================================= */

          .markdown-editor-content
            .ProseMirror
            ul {

            margin:
              1rem 0;

            padding-left:
              1.6rem;

            list-style-type:
              disc;
          }


          .markdown-editor-content
            .ProseMirror
            ol {

            margin:
              1rem 0;

            padding-left:
              1.6rem;

            list-style-type:
              decimal;
          }


          .markdown-editor-content
            .ProseMirror
            li {

            margin:
              0.3rem 0;
          }


          /* =================================================
             Blockquote
          ================================================= */

          .markdown-editor-content
            .ProseMirror
            blockquote {

            margin:
              1.2rem 0;

            padding-left:
              1rem;

            border-left:
              4px solid #cbd5e1;

            color:
              #475569;
          }


          /* =================================================
             Inline Code
          ================================================= */

          .markdown-editor-content
            .ProseMirror
            code {

            border-radius:
              0.375rem;

            background:
              #f1f5f9;

            padding:
              0.15rem 0.35rem;

            font-family:
              ui-monospace,
              SFMono-Regular,
              Menlo,
              Monaco,
              Consolas,
              monospace;

            font-size:
              0.9em;
          }


          /* =================================================
             Code Block
          ================================================= */

          .markdown-editor-content
            .ProseMirror
            pre {

            margin:
              1.25rem 0;

            overflow-x:
              auto;

            border-radius:
              0.75rem;

            background:
              #0f172a;

            padding:
              1rem 1.25rem;

            color:
              #e2e8f0;

            font-family:
              ui-monospace,
              SFMono-Regular,
              Menlo,
              Monaco,
              Consolas,
              monospace;

            font-size:
              0.875rem;

            line-height:
              1.6;
          }


          .markdown-editor-content
            .ProseMirror
            pre
            code {

            background:
              transparent;

            padding:
              0;

            color:
              inherit;
          }


          /* =================================================
             Links
          ================================================= */

          .markdown-editor-content
            .ProseMirror
            a {

            color:
              #2563eb;

            text-decoration:
              underline;

            cursor:
              pointer;
          }


          /* =================================================
             Images
          ================================================= */

          .markdown-editor-content
            .ProseMirror
            img {

            display:
              block;

            max-width:
              100%;

            height:
              auto;

            margin:
              1.5rem auto;

            border-radius:
              0.75rem;
          }


          /* =================================================
             Horizontal Rule
          ================================================= */

          .markdown-editor-content
            .ProseMirror
            hr {

            margin:
              2rem 0;

            border:
              0;

            border-top:
              1px solid #e2e8f0;
          }


          /* =================================================
             Selection
          ================================================= */

          .markdown-editor-content
            .ProseMirror
            ::selection {

            background:
              rgba(
                59,
                130,
                246,
                0.2
              );
          }


          /* =================================================
             Editor Scrollbar
          ================================================= */

          .markdown-editor-content
            .milkdown
            .editor::-webkit-scrollbar {

            width:
              8px;
          }


          .markdown-editor-content
            .milkdown
            .editor::-webkit-scrollbar-track {

            background:
              transparent;
          }


          .markdown-editor-content
            .milkdown
            .editor::-webkit-scrollbar-thumb {

            background:
              #cbd5e1;

            border-radius:
              999px;
          }


          /* =================================================
             PREVIEW
          ================================================= */

          .markdown-preview {

            font-size:
              16px;

            line-height:
              1.75;

            color:
              #0f172a;
          }


          /* =================================================
             Preview Paragraph
          ================================================= */

          .markdown-preview p {

            margin:
              0 0 1.2rem;
          }


          /* =================================================
             Preview Headings
          ================================================= */

          .markdown-preview h1 {

            margin:
              2rem 0 1rem;

            font-size:
              2rem;

            line-height:
              1.2;

            font-weight:
              700;

            color:
              #0f172a;
          }


          .markdown-preview h2 {

            margin:
              1.8rem 0 0.9rem;

            font-size:
              1.5rem;

            line-height:
              1.3;

            font-weight:
              700;

            color:
              #0f172a;
          }


          .markdown-preview h3 {

            margin:
              1.5rem 0 0.75rem;

            font-size:
              1.25rem;

            line-height:
              1.35;

            font-weight:
              700;

            color:
              #0f172a;
          }


          /* =================================================
             Preview Lists
          ================================================= */

          .markdown-preview ul {

            margin:
              1rem 0;

            padding-left:
              1.7rem;

            list-style-type:
              disc;
          }


          .markdown-preview ol {

            margin:
              1rem 0;

            padding-left:
              1.7rem;

            list-style-type:
              decimal;
          }


          .markdown-preview li {

            margin:
              0.35rem 0;
          }


          /* =================================================
             Preview Blockquote
          ================================================= */

          .markdown-preview blockquote {

            margin:
              1.5rem 0;

            padding:
              0.5rem 0 0.5rem 1rem;

            border-left:
              4px solid #cbd5e1;

            color:
              #475569;
          }


          .markdown-preview blockquote p {

            margin:
              0;
          }


          /* =================================================
             Preview Strong
          ================================================= */

          .markdown-preview strong {

            font-weight:
              700;
          }


          /* =================================================
             Preview Emphasis
          ================================================= */

          .markdown-preview em {

            font-style:
              italic;
          }


          /* =================================================
             Preview Strikethrough
          ================================================= */

          .markdown-preview del {

            text-decoration:
              line-through;
          }


          /* =================================================
             Preview Inline Code
          ================================================= */

          .markdown-preview code {

            border-radius:
              0.375rem;

            background:
              #f1f5f9;

            padding:
              0.15rem 0.35rem;

            font-family:
              ui-monospace,
              SFMono-Regular,
              Menlo,
              Monaco,
              Consolas,
              monospace;

            font-size:
              0.9em;
          }


          /* =================================================
             Preview Code Block
          ================================================= */

          .markdown-preview pre {

            margin:
              1.5rem 0;

            overflow-x:
              auto;

            border-radius:
              0.75rem;

            background:
              #0f172a;

            padding:
              1rem 1.25rem;

            color:
              #e2e8f0;

            font-family:
              ui-monospace,
              SFMono-Regular,
              Menlo,
              Monaco,
              Consolas,
              monospace;

            font-size:
              0.875rem;

            line-height:
              1.6;
          }


          .markdown-preview pre code {

            background:
              transparent;

            padding:
              0;

            color:
              inherit;
          }


          /* =================================================
             Preview Links
          ================================================= */

          .markdown-preview a {

            color:
              #2563eb;

            text-decoration:
              underline;

            text-underline-offset:
              2px;
          }


          .markdown-preview a:hover {

            color:
              #1d4ed8;
          }


          /* =================================================
             Preview Images
          ================================================= */

          .markdown-preview img {

            display:
              block;

            max-width:
              100%;

            height:
              auto;

            margin:
              1.75rem auto;

            border-radius:
              0.75rem;
          }


          /* =================================================
             Preview Horizontal Rule
          ================================================= */

          .markdown-preview hr {

            margin:
              2rem 0;

            border:
              0;

            border-top:
              1px solid #e2e8f0;
          }


          /* =================================================
             Preview Tables
          ================================================= */

          .markdown-preview table {

            width:
              100%;

            margin:
              1.5rem 0;

            border-collapse:
              collapse;

            overflow:
              hidden;
          }


          .markdown-preview th {

            border:
              1px solid #cbd5e1;

            background:
              #f8fafc;

            padding:
              0.65rem 0.75rem;

            text-align:
              left;

            font-weight:
              700;
          }


          .markdown-preview td {

            border:
              1px solid #cbd5e1;

            padding:
              0.65rem 0.75rem;

            text-align:
              left;
          }


          /* =================================================
             Preview Empty State
          ================================================= */

          .markdown-preview-empty {

            border-bottom:
              1px solid #e2e8f0;
          }


          /* =================================================
             Mobile
          ================================================= */

          @media (max-width: 640px) {

            .markdown-editor-content
              .milkdown
              .editor {

              min-height:
                500px;

              padding:
                20px
                16px
                60px;
            }


            .markdown-editor-content
              .ProseMirror {

              min-height:
                450px;
            }


            .markdown-preview {

              font-size:
                15px;
            }


            .markdown-preview
              h1 {

              font-size:
                1.7rem;
            }


            .markdown-preview
              h2 {

              font-size:
                1.4rem;
            }


            .markdown-preview
              h3 {

              font-size:
                1.2rem;
            }


            .markdown-preview
              table {

              display:
                block;

              overflow-x:
                auto;

              white-space:
                nowrap;
            }

          }

        `}
      </style>

    </MilkdownProvider>
  );
};


export default MarkdownEditor;