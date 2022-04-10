import { Typography, Grid } from 'antd';
import { Navigation } from 'swiper';
import Cardbox from 'components/Explores/Cardbox';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import avatarFake from 'assets/images/avatar-explore.png';
import imgFake from 'assets/images/img-explore.png';
import styles from './styles.module.css';
import { Link, NavLink } from 'react-router-dom';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const fakeDataItem = {
  name: 'Name',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam orci congue diam tempor dui sed vitae. Urna, in metus, eu diam sit aliquet.',
  avatar: avatarFake,
  image: imgFake,
};

const { useBreakpoint } = Grid;

const ExploreSlide = () => {
  const { sm, md } = useBreakpoint();

  return (
    <div className={styles.exploreMainWrapper}>
      <div className={styles.exploreSlideWrapper}>
        <NavLink to="/explore">
          <Typography.Title level={3}>Explore</Typography.Title>
        </NavLink>
      </div>
      <Swiper
        slidesPerView={md ? 3 : sm ? 2 : 1}
        spaceBetween={15}
        navigation={{
          nextEl: '.next-btn',
          prevEl: '.prev-btn',
        }}
        modules={[Navigation]}
        className={styles.mySwiper}
      >
        {Array.from(Array(6).keys()).map((index) => (
          <SwiperSlide key={index}>
            <Link to="/collection" className="link-custom">
              <Cardbox
                item={{
                  ...fakeDataItem,
                  name: fakeDataItem.name + ' ' + (index + 1),
                }}
              />
            </Link>
          </SwiperSlide>
        ))}

        <div className={styles.arrowWrapper}>
          <div className={`${styles.btnArrow} prev-btn`}>
            <LeftOutlined />
          </div>
          <div className={`${styles.btnArrow} next-btn`}>
            <RightOutlined />
          </div>
        </div>
      </Swiper>
    </div>
  );
};

export default ExploreSlide;
