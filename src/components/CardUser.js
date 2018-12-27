import React from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../action-creators';


//material ui
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';

import '../pages/user.scss';

// get state and action
@connect((state) => {
    return {
        userState: state.getUser.toJS().user
    };
    }, {
        getUserDetailAction: ActionCreators.getUser.getUserDetail,
        getCountRepoAction: ActionCreators.getUser.getCountRepo,
        getTypeAction: ActionCreators.getUser.getType
    })

class CardUser extends React.Component{
    constructor(){
        super();
        this.state = {
            loading:false,            
        }
    }
    render(){
        if(this.state.loading){
            return <CircularProgress />
        }
        return(
            <Grid container spacing={16}>
                {this.props.userState.items.map((it) => {
                    return(
                    <Grid item md={3}>
                        <Card onClick={() =>{
                            this.setState({ loading: true })
                            const params = {
                                q:`user:${it.login}`
                            }
                            Promise.all([this.props.getUserDetailAction(it.avatar_url,it.login),this.props.getCountRepoAction(params)])
                                .then(()=> {
                                    this.props.getTypeAction('detail')
                                })

                        }}>
                            <CardActionArea style={{ width:'100%' }}>
                                <CardMedia
                                style={{ height:140, width:'100%' }}
                                image={it.avatar_url}
                                title="Contemplative Reptile"
                                />
                                <CardContent style={{ width:'100%' }}>
                                <p>
                                    {it.login}
                                </p>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    )
                })}
            </Grid>
        )
    }
}

export default CardUser;