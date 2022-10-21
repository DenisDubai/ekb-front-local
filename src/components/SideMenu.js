// подключение tree для создания древовидного отображения менюшки
// подключение spin для отображения гифки загрузки
import { Tree, Spin, Image, AutoComplete} from 'antd';
// подключение хуков React
// useEffect позволяет выполнять функцию после каждого рендеринга страницы, как первого, так и после обновления страницы
// useState позволяет определить нынешнее состояние компонента
import { useEffect, useState } from 'react';
// подключение стилей для использования в вертикальной менюшке
import '../App.less';
// подключение категорий для того, чтобы взять значения для менюшки
import { getAllCategories } from '../services/main';

// функция вертикального меню
export function SideMenu(props) {

    // переменные состояния 
    // значения в скобках [], первое значение - переменная состояния, второе значение - функция, изменяющая данное значение
    const [treeData, setTreeData] = useState(null);
    const [expandedKeys, setExpandedKeys] = useState();
    const [spinning, setSpinning] = useState(true);

    //response - ответ на запрос fetch серверу
    //setSpinning(false) - убираем колесо загрузки
    useEffect(() => {
        getAllCategories().then(response =>{ response && setTreeData(response); setSpinning(false)})
    }, [])



    return (
        <>  
            <Image src="http://asonika-k.ru/templates/asktemplate/images/logo.png" preview = {false}/>
            {/* <span className='title'>АСОНИКА-К</span> */}
            {/* колесо загрузки */}
            <Spin spinning={spinning}>
                {/* className - класс для создания стилей */}
                <Tree
                    expandedKeys={expandedKeys}
                    onSelect={(selectedKey, info)=>props.onSelectCategory(info.node)}
                    treeData={treeData}
                    className='menuItems'
                    height={1000}
                    onExpand={setExpandedKeys}
                />
            </Spin>
        </>
    )
}