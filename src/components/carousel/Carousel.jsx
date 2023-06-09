/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
    BsFillRewindCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../../components/circleRating/CircleRating"

import './style.scss'
import Genres from "../genres/Genres";
const Carousel = (props) => {
    const { data, loading, itemType, title } = props;


    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const navigation = (dir) => {
        const container = carouselContainer.current;
        const scrollAmount = dir === 'left' ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth)

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        })
    }

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock">
                    <div className="textBlock">
                        <div className="title skeleton">
                            <div className="textBlock">
                                <div className="title skeleton"></div>
                                <div className="date skeleton"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className="carousel">
            <ContentWrapper>

                {title && (<div className="carouselTitle">
                    {title}
                </div>)}

                {data?.length > 5 ? (<React.Fragment><BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation('left')}
                />

                    <BsFillArrowRightCircleFill
                        className="carouselRighttNav arrow"
                        onClick={() => navigation('right')}
                    /></React.Fragment>) : null}


                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item) => {
                            const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback
                            return (
                                <div
                                    key={item.id}
                                    className="carouselItem" onClick={(() => navigate(`/${item.media_type === undefined ? itemType : item.media_type}/${item.id}`))} >
                                    <div className="posterBlock">
                                        <Img src={posterUrl}
                                        />
                                        <CircleRating rating={item.vote_average.toFixed()} />
                                        <Genres data={item.genre_ids.slice(0, 2)} />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title"> {item.title || item.name} </span>

                                        <span className="date"> {dayjs(item.release_Data).format("MMM, D YYYY")} </span>

                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}

            </ContentWrapper>
        </div>
    )
}


export default Carousel