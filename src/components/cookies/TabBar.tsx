'use client';

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props { 
    currentTab?: number;
    tabOptions?: number[];
}

export const TabBar = ({ tabOptions = [1,2,3,4], currentTab = 1 }: Props) => {

    const router = useRouter();

    const [selected, setSelected] = useState(currentTab);

    const onTabSelected = ( selectedTab: number ) => {
        setSelected( selectedTab );
        setCookie('selectedTab', selectedTab.toString());
        router.refresh();
    }


    return (
        <div className={`grid w-full space-x-2 rounded-xl bg-gray-200 p-2 grid-cols-${(tabOptions.length).toString()}`}>
            {
                tabOptions.map(tab => (
                    <div key={ tab }>
                        <input
                            checked={ selected === tab }
                            type="radio" 
                            id={ tab.toString() } 
                            className="peer hidden"
                            onChange={ () => {} }
                        />
                        <label 
                            onClick={ () => onTabSelected(tab) }
                            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
                        >
                            { tab }
                        </label>
                    </div>
                ))
            }
            
        </div>
    )
  }
