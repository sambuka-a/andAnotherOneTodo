import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { BsSun, BsFillMoonFill } from "react-icons/bs";
import { setTheme } from './theme-slice';


const ThemeSwitcher = () => {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.theme)

    const toggleTheme = () => dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))

    useEffect(() => {
        document.body.setAttribute('data-theme', theme)
      }, [theme]);

  return (
    <div>
        {theme === 'dark' ? 
            <BsSun onClick={toggleTheme}/> : 
            <BsFillMoonFill onClick={toggleTheme}/>
        }
    </div>
  )
}

export default ThemeSwitcher