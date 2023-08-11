import React, {useState, useEffect} from 'react'
import { createAPIEndpoint, ENDPOINTS } from '../../api'
import { IconButton, InputBase, List, ListItem, ListItemSecondaryAction, ListItemText, Paper } from '@mui/material'
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { makeStyles } from '@mui/styles';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Air } from '@mui/icons-material';

const useStyles = makeStyles(theme =>({
    searchPaper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '88%'
    },
    searchInput: {
        marginLeft: theme.spacing(1.5),
        flex: 1
    },
    listItem: {
        marginLeft: '-15px'
    },
    listRoot: {
        marginTop: theme.spacing(1),
        maxHeight: 450,
        maxWidth: '90%',
        overflow: 'auto',
        '& li:hover': {
            cursor: 'pointer',
            backgroundColor: '#E3E3E3'
        },
        '& li:hover .MuiButtonBase-root': {
            display: 'block',
            color: '#000',
        },
        '& .MuiButtonBase-root':{
            display: 'none'
        },
        '& .MuiButtonBase-root: hover': {
            backgroundColor: 'transparent'
        }
    }
}))



export default function SearchFoodItems(props) {

    const { addFoodItem, orderedFoodItems } = props
    const [foodItems, setFoodItems] = useState([])
    const [searchList, setSearchList] = useState([])
    const [searchKey, setSearchKey] = useState('')
    const classes = useStyles()

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.FOODITEM).fetchAll()
        .then(res => {
            setFoodItems(res.data)
            setSearchList(res.data)
        })
    
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        let x = [...foodItems];
        x = x.filter(y => {
            return y.foodItemName.toLowerCase().includes(searchKey.toLocaleLowerCase())
            && orderedFoodItems.every(item => item.foodItemId != y.foodItemId)
        });
        setSearchList(x);
    }, [searchKey, orderedFoodItems])
  return (
    <>
    <Paper className={classes.searchPaper}>
        <InputBase
        className={classes.searchInput}
        value={searchKey}
        onChange = {e => setSearchKey(e.target.value)}
        placeholder='Search food items'/>
        <IconButton>
            <SearchTwoToneIcon/>
        </IconButton>
    </Paper>
    <List className={classes.listRoot}>
        {
            searchList.map((item, idx) =>(
                <ListItem
                className={classes.listItem}
                key = {idx}>
                    <ListItemText
                    primary = {item.foodItemName}
                    secondary = {'$' + item.foodItemPrice}
                    />
                    <ListItemSecondaryAction>
                        <IconButton onClick={e => addFoodItem(item)}>
                            <PlusOneIcon/>
                            <ArrowForwardIosIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ) )
        }
    </List>
    </>
  )
}
