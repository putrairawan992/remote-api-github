import React from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../action-creators';


//material ui
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import '../pages/user.scss';

// get state and action
@connect((state) => {
    return {
        nameState: state.getUser.toJS().name,
        pictureState: state.getUser.toJS().picture,
        repoState: state.getUser.toJS().repo
    };
    }, {
        getUserDetailAction: ActionCreators.getUser.getUserDetail
    })

class CardUserDetail extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <Grid container spacing={16}>
                    <Grid item md={3}>
                        <Card>
                            <CardActionArea style={{ width:'100%' }}>
                                <CardMedia
                                style={{ height:140, width:'100%' }}
                                image={this.props.pictureState}
                                title="Contemplative Reptile"
                                />
                                <CardContent style={{ width:'100%', display:'flex', justifyContent:'space-between' }}>
                                <p>
                                    {this.props.nameState}
                                </p>
                                <p style={{ marginRight:50 }}>Total Repositories : {this.props.repoState.total_count}</p>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
            </Grid>
        )
    }
}

export default CardUserDetail;