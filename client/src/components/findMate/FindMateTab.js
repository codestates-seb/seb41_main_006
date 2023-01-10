import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const FindMateTabWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
  .tabs {
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 6rem;
  }
  .tab-line {
    height: 1px;
    width: 100%;
    background-color: var(--main-font-color);
    opacity: 0.1;
  }
`;

const StyledTabLink = styled(Link)`
  width: 7rem;
  padding-bottom: 0.3rem;
  text-align: center;
  color: var(--sec-color);
  font-size: 1.25rem;
  font-weight: 700;

  &.focus {
    color: var(--main-font-color);
    border-bottom: 4px solid;
    > div {
      visibility: visible;
      height: 4px;
      width: 6rem;
      background-color: var(--main-font-color);
    }
  }
`;

const FindMateTab = () => {
  const { pathname } = useLocation();

  return (
    <FindMateTabWrapper>
      <div className="tabs">
        <StyledTabLink
          className={
            pathname === '/mate' || pathname === '/mate/users' ? 'focus' : ''
          }
          to="users"
        >
          산책 메이트
        </StyledTabLink>
        <StyledTabLink
          className={pathname === '/mate/posts' ? 'focus' : ''}
          to="posts"
        >
          산책 모임
        </StyledTabLink>
      </div>
      <div className="tab-line"></div>
    </FindMateTabWrapper>
  );
};

export default FindMateTab;
