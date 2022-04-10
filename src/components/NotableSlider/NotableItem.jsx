import { Avatar, Button, Card } from 'antd';
import AvatarImg from 'assets/images/Notable/Avatar.png';
import Notable from 'assets/images/Notable/Notable-1.png';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const { Meta } = Card;

export const NotableItem = ({ imgUrl, avatarUrl, title, name }) => {
  return (
    <div
      className={styles.notableItem}
      style={{
        backgroundImage: `linear-gradient(black,
        transparent 20%,
        transparent 80%,
        black), url(${imgUrl || Notable})`,
      }}
    >
      <div className={styles.notableInfo}>
        <Meta
          avatar={<Avatar src={avatarUrl || AvatarImg} />}
          title={title}
          description={
            <p>
              by{' '}
              <span style={{ color: '#F27352', fontWeight: 700 }}>{name}</span>
            </p>
          }
        />
        <Link to="/collection">
          <Button
            // onClick={() => history.push("/explore")}
            size="large"
            className={styles.exploreBtn}
          >
            Explore
          </Button>
        </Link>
      </div>
    </div>
  );
};
