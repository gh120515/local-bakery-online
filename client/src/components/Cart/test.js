import { List, ListIcon, ListItem } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom';
import { 
    CloseButton,
 } from '@chakra-ui/icons'

const Cart = () => {
    return ( 
        <List color="white" fontSize="1.2em" spacing={4}>
            <CloseButton onClick={toggleCart} />
            <ListItem>
                <NavLink to="/">
                    <ListIcon as={CalendarIcon}/>
                    Dashboard
                </NavLink>
            </ListItem>
        </List>
     );
}
 
export default Sidebar;