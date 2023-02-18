import { ReactNode, useState } from 'react';
import { ButtonGroup, Tab, TabsStyled } from './Tabs.styles';

export type TabType = {
  key: string;
  title: ReactNode;
  children?: ReactNode;
};
type TabsProps = {
  defaultSelectedTab?: string;
  tabs: TabType[];
};

// const Tab = () => {};

const Tabs = ({ tabs, defaultSelectedTab }: TabsProps) => {
  const [active, setActive] = useState(defaultSelectedTab ?? tabs[0].key);
  const activeChildren = tabs.find((tab) => tab.key === active)?.children;
  // const handleTabOnClick = useCallback((key: string) => setActive(key), []);
  return (
    <TabsStyled>
      <ButtonGroup>
        {tabs.map(({ title, key }) => (
          <Tab
            key={key}
            active={active === key}
            onClick={() => setActive(key)}
            type='button'
          >
            {title}
          </Tab>
        ))}
      </ButtonGroup>

      {activeChildren}
    </TabsStyled>
  );
};

export default Tabs;
