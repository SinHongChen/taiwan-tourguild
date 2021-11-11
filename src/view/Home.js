import React, { useEffect } from 'react';
import styled from 'styled-components';
import ActivityCardRow from 'components/rows/ActivityCardRow';
import CityCardRow from 'components/rows/CityCardRow';
import { cityMenu } from "helpers/menu";
import { deviceMedia } from "helpers/device";
import ResultBySearch from 'components/result/ResultBySearch';


//#region import hook
import useActivity from 'hook/useActivity';
//#endregion

//#region styled component

const Container = styled.div`
    width: 94%;
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 30px;
    margin:0 auto;
    @media ${deviceMedia.desktop}{
        padding: 40px 0px;
    }

    @media ${deviceMedia.tablet}{
        padding: 20px 0 40px 0px;
    }

    @media ${deviceMedia.mobile}{
        padding: 40px 0px;
    }
`



//#endregion

const Home = () => {
    const activity = useActivity();
    const searchParams = {
        category: "hotel",
        city: "",
        keyword: "",
        page: 1
    };

    // 初始化資料
    useEffect(() => {
        activity.getActivityInfosByKeywordAndCity("", "", 4, 100)
            .then((data) => {
                activity.setActivityInfos(data);
            })
    }, [])

    return (
        <Container>
            <CityCardRow
                title={"城市探索"}
                list={cityMenu.slice(1)}
                logo={"triangle"}
            />
            <ActivityCardRow
                title={"推薦活動"}
                list={activity.activityInfos}
                logo={"triangle"}
                show={activity.activityInfos?.length > 0}
            />
            <ResultBySearch
                title={"推薦旅宿"}
                slice={4}
                isShow={true}
                canChangePage={false}
                searchParams={searchParams}
            />
        </Container>
    )
}

export default Home
