import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Grid, Typography } from 'antd';
import AvatarImg from 'assets/images/Notable/Avatar.png';
import Notable1 from 'assets/images/Notable/Notable-1.png';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { NotableItem } from './NotableItem';
import styles from './styles.module.css';

const { useBreakpoint } = Grid;

const data = [
  {
    avatarUrl: AvatarImg,
    imgUrl: Notable1,
    title: 'Futuristic Abstract',
    name: 'AI Artists',
  },
  {
    avatarUrl: AvatarImg,
    imgUrl: Notable1,
    title: 'Futuristic Abstract',
    name: 'AI Artists',
  },
  {
    avatarUrl: AvatarImg,
    imgUrl: Notable1,
    title: 'Futuristic Abstract',
    name: 'AI Artists',
  },
  {
    avatarUrl: AvatarImg,
    imgUrl: Notable1,
    title: 'Futuristic Abstract',
    name: 'AI Artists',
  },
  {
    avatarUrl: AvatarImg,
    imgUrl: Notable1,
    title: 'Futuristic Abstract',
    name: 'AI Artists',
  },
  {
    avatarUrl: AvatarImg,
    imgUrl: Notable1,
    title: 'Futuristic Abstract',
    name: 'AI Artists',
  },
];

const NotableSlider = () => {
  const { md, lg } = useBreakpoint();

  return (
    <div style={{ marginBottom: 120 }}>
      <div className={styles.notableSliderWrapper}>
        <Typography.Title level={3}>
          Notable <Typography.Text>Collections</Typography.Text>
        </Typography.Title>
      </div>
      <Swiper
        loop={true}
        slidesPerView={!md ? 1 : 2}
        spaceBetween={lg ? 30 : 15}
        centeredSlides={true}
        // pagination={{
        //   clickable: true,
        // }}
        navigation={{
          nextEl: '.next-btn',
          prevEl: '.prev-btn',
        }}
        modules={[Navigation]}
        className={styles.mySwiper}
      >
        <div className={`${styles.btnPrev} ${styles.btnArrow} prev-btn`}>
          <LeftOutlined />
        </div>

        {data.map((item, i) => (
          <SwiperSlide key={i}>
            <NotableItem
              imgUrl={item.imgUrl}
              avatarUrl={item.avatarUrl}
              title={item.title}
              name={item.name}
            />
          </SwiperSlide>
        ))}
        <div className={`${styles.btnNext} ${styles.btnArrow} next-btn`}>
          <RightOutlined />
        </div>
      </Swiper>
    </div>
  );
};

export default NotableSlider;
