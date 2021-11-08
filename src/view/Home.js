import React, { useEffect } from 'react';
import styled from 'styled-components';
import ActivityCardRow from 'components/cardRows/ActivityCardRow';
import CityCardRow from 'components/cardRows/CityCardRow';
import { cityMenu } from "helpers/menu";
import { device } from "helpers/device";


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
    @media ${device.desktop}{
        padding: 40px 0px;
    }

    @media ${device.tablet}{
        padding: 20px 0 40px 0px;
    }

    @media ${device.mobile}{
        padding: 40px 0px;
    }
`



//#endregion

const Home = () => {
    const activity = useActivity();

    // 初始化資料
    useEffect(() => {
        activity.getActivityInfosBySearch("", "", 4, 100)
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
        </Container>
    )
}

export default Home
