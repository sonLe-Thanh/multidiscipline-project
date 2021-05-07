import BackGroundNormal from '../components/BackGroundNormal';
import Header from '../components/Header';
import Button from '../components/Button';


export default function HomeScreen({navigation}){
    return (
        <BackGroundNormal>
            <Header>HOME SCREEN HERE</Header>
            <Button mode="contained" 
                onPress={()=>{navigation.reset({
                    index: 0,
                    routes: [{name: 'LoginScreen'}],
                })}}
            > 
                Log out
            </Button>

        </BackGroundNormal>
    );    
}