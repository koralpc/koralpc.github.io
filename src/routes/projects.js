import AppToolBar from './../components/appbar';

export default function ProjectView(props) {

    return(
        <AppToolBar toggleTheme={props.toggleTheme} brightnessIcon ={props.brightnessIcon}/>
    )
}