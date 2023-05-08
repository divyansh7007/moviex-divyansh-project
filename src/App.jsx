import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { fetchDataFromApi } from './utils/api';

import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration } from './store/homeSlice';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/home/home';
import Details from './pages/details/details';
import SearchResult from './pages/searchResult/searchResutl';
import Explore from './pages/explore/explore';
import PageNotFound from './pages/404/404';

function App() {
  const { url } = useSelector((state) => state.home)
  const dispatch = useDispatch()
  useEffect(() => {
    fetchApiConfig();
  }, []);

  const fetchApiConfig = () => fetchDataFromApi('/configuration').then((res) => {
    console.log(res)

    const url = {
      backdrop: res.images.secure_base_url + 'original',
      poster: res.images.secure_base_url + 'original',
      profile: res.images.secure_base_url + 'original',
    }

    dispatch(getApiConfiguration(url));
  });
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Details />} />
        <Route path='/search/:query' element={<SearchResult />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default App
