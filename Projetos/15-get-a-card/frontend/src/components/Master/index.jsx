import Header from "../Header"
import Footer from "../Footer"

function Master(props){


    return(
        <>
        <Header></Header>
        <main>{props.children}</main>
        <Footer></Footer>
        </>
    )
}

export default Master;