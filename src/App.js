import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Registration from "./Pages/Registration/Registration";
import Registry from "./Pages/Registry/Registry";
import Services from "./Pages/Services/Services";
import TestimonialSliderParent from "./Pages/Home/Section3/TestimationSliderParent";
import BusinessProfile from "./Pages/BusinessProfile/BusinessProfile";
import FilterServices from "./Pages/FilterServices/FilterServices";
import Cart from "./Pages/Cart/Cart";
import Chat from "./Pages/Chat/Chat";
import AccountSettings from "./Pages/AccountSettings/AccountSettings";
import Login from "./Pages/Login/Login";
import ServiceModal from "./Components/ServiceModal";
import AddServices from "./Pages/Services/AddServices";
import PrivateRegistry from "./Pages/PrivateRegistry/Private_Registry";


function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/registration" element={<Registration/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/accountsettings" element={<AccountSettings/>}/>
                    <Route path="/registry" element={<Registry/>}/>
                    <Route path="/testimonialSlider" element={<TestimonialSliderParent/>}/>
                    <Route path="/filterservices" element={<FilterServices/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/registry/services" element={<ServiceModal/>}/>
                    <Route path="/services" element={<Services/>}/>
                    <Route path="/addServices" element={<AddServices/>}/>
                    <Route path="/businessProfile" element={<BusinessProfile/>}/>
                    <Route path="/chat" element={<Chat/>}/>
                    <Route path="/private/registry" element={<PrivateRegistry/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
