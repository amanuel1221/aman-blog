import React from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import AboutPage from './pages/AboutPage';
import {Routes, Route, Navigate} from 'react-router-dom';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/Contact';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import AdminLayout from "./admin/components/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminPosts from "./admin/pages/AdminPosts";
import AdminCreatePost from "./admin/pages/AdminCreatePost";
import AdminEditPost from "./admin/pages/AdminEditPost";
import AdminMessages from "./admin/pages/AdminMessages";
import AdminAnalytics from "./admin/pages/AdminAnalytics";
import ProtectedAdminRoute from './admin/components/ProtectedAdminRoute';


const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/details' element={<DetailsPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/blogs' element={<BlogPage />} />
        <Route path='/blogs/:id' element={<DetailsPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/signin' element={<SignInPage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>

        <Route
          path="/admin/*"
          element={

            <ProtectedAdminRoute>
               <AdminLayout />
            </ProtectedAdminRoute>
             
           
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="posts" element={<AdminPosts />} />
          <Route path="posts/create" element={<AdminCreatePost />} />
          <Route path="posts/edit/:id" element={<AdminEditPost />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;