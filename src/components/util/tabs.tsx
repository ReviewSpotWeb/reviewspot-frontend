import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setActive } from "../../reducers/tab-reducer";

export type TabInfo = {
  key: string;
  label: string;
  children: JSX.Element;
};

type TabProps = {
  tabs: TabInfo[];
  defaultActive?: number;
};

const Tabs = ({ tabs, defaultActive }: TabProps) => {
  const stateActiveTabIdx = useAppSelector(
    (state) => state.activeTab.activeIdx
  );
  const dispatch = useAppDispatch();
  const [activeTabIdx, setActiveTabIdx] = useState<number>(defaultActive ?? 0);

  const handleChangeTab = (tabIdx: number) => {
    setActiveTabIdx(tabIdx);
    dispatch({
      type: setActive,
      payload: tabIdx,
    });
  };

  const getTabStyle = (tabIdx: number): string => {
    const tabStyle =
      "border-4 border-b-0 rounded-t p-1 px-3 text-gray-300 font-bold select-none";
    return tabIdx === activeTabIdx
      ? `${tabStyle} bg-[#202020] border-[#303030]`
      : `${tabStyle} bg-[#303030] border-transparent cursor-pointer`;
  };

  useEffect(() => {
    setActiveTabIdx(stateActiveTabIdx);
  }, [stateActiveTabIdx]);

  return (
    <div>
      <div className="ms-3 flex gap-2">
        {tabs.map((tab, idx) => {
          return (
            <div
              key={idx}
              onClick={() => handleChangeTab(idx)}
              className={getTabStyle(idx)}
            >
              {tab.label}
            </div>
          );
        })}
      </div>
      <div>
        {tabs.map((tab, idx) => {
          return (
            idx === activeTabIdx && <div key={tab.key}>{tab.children}</div>
          );
        })}
      </div>
    </div>
  );
};
export default Tabs;
