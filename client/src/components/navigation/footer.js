import React from 'react'
import ContactsIcon from '@material-ui/icons/Contacts'
import TimelapseIcon from '@material-ui/icons/Timelapse'
import PhoneIcon from '@material-ui/icons/Phone'
import EmailIcon from '@material-ui/icons/Email'

const Footer = () => {
    return (
        <footer className="bck_b_dark">
            <div className="container">
                <div className="logo">
                    Waves
                </div>
                <div className="wrapper">
                    <div className="left">
                        <h2>Contact information</h2>
                        <div className="business_nfo">
                            <div className="tag">
                                <ContactsIcon />
                                <div className="nfo">
                                    <div>Address</div>
                                    <div>La Xuan Oai, Ho Chi Minh</div>
                                </div>
                            </div>
                            <div className="tag">
                                <PhoneIcon />
                                <div className="nfo">
                                    <div>Phone</div>
                                    <div>02141024091409</div>
                                </div>
                            </div>
                            <div className="tag">
                                <TimelapseIcon/>                               
                                <div className="nfo">
                                    <div>Working hours</div>
                                    <div>Always closed</div>
                                </div>
                            </div>
                            <div className="tag">
                                <EmailIcon/>                               
                                <div className="nfo">
                                    <div>Email</div>
                                    <div>sang@gmail.com</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <h2>Be the first to know about</h2>
                        <div>
                            <div>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id error soluta tempora, nobis enim, quisquam saepe ab, dolores necessitatibus deleniti quasi. Recusandae iusto delectus inventore pariatur qui! Cupiditate, ipsa ullam.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer