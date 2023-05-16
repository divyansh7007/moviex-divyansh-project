/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Similar = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/similar`
    );

    return (
        <>
            {
                data?.results > 0 && (
                    <Carousel
                        title="Similar Movies"
                        data={data?.results}
                        loading={loading}
                        endpoint={mediaType}
                    />
                )
            }
        </>
    );
};

export default Similar;