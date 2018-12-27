import React from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../action-creators';

//material ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace'
import CardUser from '../components/CardUser';
import CardUserDetail from '../components/CardUserDetail';

import './user.scss';

// get state and action
@connect((state) => {
    return {
        typeState: state.getUser.toJS().type_page
    };
    }, {
        getUserAction: ActionCreators.getUser.getUserAction,
        getCountRepoAction: ActionCreators.getUser.getCountRepoAction,
        getTypeAction: ActionCreators.getUser.getType
    })

class User extends React.Component{
    constructor(){
        super();
        this.state = {
            filter: 'desc',
            loading:true,
            search:''
        }
    }

    componentDidMount(){
        this.props.getTypeAction('all')
        const params = {
            q: 'type:user',
            sort:'repositories',
            order:this.state.filter
        }
        Promise.all([this.props.getUserAction(params)])
        .then(() => {
            console.log(this.props.userState)
            this.setState({ loading:false })
        })
    }

    handleChange(e){
        this.props.getTypeAction('all')
        this.setState({filter: e.target.value,loading:true})
        const params = {
            q: 'type:user',
            sort:'repositories',
            order:e.target.value
        }
        Promise.all([this.props.getUserAction(params)])
        .then(() => {
            console.log(this.props.userState)
            this.setState({ loading:false })
        })
    }
    handleChangeSearch(e){
        this.props.getTypeAction('all')
        this.setState({search: e.target.value})
    }
    handleSearch(){
        this.props.getTypeAction('all')
        this.setState({ loading:true })
        const params = {
            q: this.state.search,
            per_page:42,
            page:1
        }
        Promise.all([this.props.getUserAction(params)])
        .then(() => {
            console.log(this.props.userState)
            this.setState({ loading:false })
        })
    }

    render(){
        return(
            <div className={''} style={{ textAlign:'center' }}>
                <AppBar position="static">
                    <Toolbar className="content">
                        <div style={{ display:'flex',justifyContent:'space-between' }}>
                            <h3>
                                Github User Search
                            </h3>
                            { this.props.typeState === 'detail' && <KeyboardBackspace style={{ cursor:'pointer', marginLeft:20 }} onClick={() => {
                                this.props.getTypeAction('all')
                            }} />}
                        </div>
                        <div className="content-item">
                        <FormControl className="content-item__select">
                            <InputLabel htmlFor="age-simple">Filter</InputLabel>
                            <Select
                                value={this.state.filter}
                                onChange={this.handleChange.bind(this)}
                                >
                                <MenuItem value="desc">Paling Banyak</MenuItem>
                                <MenuItem value="asc">Paling Sedikit</MenuItem>
                            </Select>
                        </FormControl>
                        <div className="content-item__search">
                            <InputBase
                                placeholder="Search…"
                                onChange={this.handleChangeSearch.bind(this)}
                            />
                        </div>
                        <Button onClick={this.handleSearch.bind(this)} variant="contained" color="secondary" className="content-item__button">
                            Search
                        </Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <br />
                { this.state.loading && <CircularProgress />}
                <div style={{ padding: 10 }}>
                { !this.state.loading && 
                         this.props.typeState === 'all' ? <CardUser /> : <CardUserDetail />
                }
                </div>
            </div>
        )
    }
}

export default User;