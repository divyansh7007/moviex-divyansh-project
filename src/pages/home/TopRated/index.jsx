import React, { useState } from 'react'

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import '../style.scss'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'

import useFetch from "../../../hooks/useFetch"
import Carousel from '../../../components/carousel/Carousel'

const TopRated = () => {
    const [endpoint, setEndpoint] = useState('movie');

    const { data, loading } = useFetch(`/${endpoint}/top_rated`);
    const onTabChange = (tab) => {
        setEndpoint(tab === 'Movie' ? 'movie' : 'tv');
    }

    return (
        <div className='carouselSection'>
            <ContentWrapper className='contentWrapper'>
                <span className="carouselTitle">Top Rated</span>
                <SwitchTabs data={[ "Movie", "Tv Shows" ]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} itemType={endpoint} />
        </div>
    )
}

export default TopRated