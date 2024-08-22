import { FC, ReactNode, useContext, useEffect } from 'react';

// import { AppContext } from '@/contexts/AppContext';
// import { E_TYPE_SUB_LAYOUT } from '@/enums/E_TypeMenu';
import LayoutLibrary from './LayoutLibrary';

interface SidebarLayoutProps {
  children?: ReactNode;
}

const SubLayout: FC<SidebarLayoutProps> = ({ children }) => {

    // const { typeSubLayout } = useContext(AppContext);
    
    const getLayoutBody = (): JSX.Element => {
        let element: JSX.Element = <></>;

        // switch (typeSubLayout) {
        //     case E_TYPE_SUB_LAYOUT.LIBRARY:
        //         element = (
        //             <LayoutLibrary>
        //                 {children}
        //             </LayoutLibrary>
        //         );
        //         break;
            
        //     default:
              
        //         break;
        // }

        return element; 
    };
 
    useEffect(() => {
       
    }, []);

    return (
        <>
            {
                getLayoutBody()
            }
        </>
    );
};

export default SubLayout;
