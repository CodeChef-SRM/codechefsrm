import React from 'react';
import './Domains.css';
import Technical from '../../Assets/technical.png'
import Creatives from '../../Assets/creatives.png';
import Corporate from '../../Assets/corporate.png';
const Domains = () => {
    return (
        <div className="domains__master">
            <div className="left__div__domains">
                <div>
                    <h2 className="domains__head">Our Domains</h2>
                    <p className="info">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel neque molestie, euismod quam id, commodo neque. Nulla facilisi. Nam in congue mi. Curabitur malesuada mauris est, non faucibus nisl cursus vel. Etiam congue erat felis, at viverra nisl vehicula ac. Sed consequat in dolor et imperdiet. Aenean auctor a nunc rutrum bibendum. Nulla fermentum risus quis nibh fringilla sollicitudin at sit amet sapien. Duis eget bibendum quam. Quisque venenatis tempus tortor.
                        Cras efficitur facilisis pretium. Mauris elementum lacus sed maximus vulputate. Sed nisi mauris, sodales id porta quis, vestibulum eget lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque nec interdum neque, quis faucibus felis. Etiam efficitur tristique risus, ac lobortis lacus ultricies a. In tincidunt ac magna nec ornare. Integer sagittis non mi ac semper. Donec sollicitudin felis a odio ultricies tempor. Mauris viverra gravida magna, eu malesuada mi bibendum sed. Nulla blandit, felis non viverra interdum, magna odio pulvinar lorem, in pretium metus leo non nibh. Praesent nec urna ante.</p>

                </div>
                <div>
                    <p className="arrow">&rarr;</p>
                </div>
            </div>
            <div className="right__div__domains">
                <div className="domain__card flex__center">
                    <div className="domain__card__left">
                        <h1 className="domain__card__heading">Technical</h1>
                        <p className="domain__card__info">Codechef SRM KTR Chapter is a Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,</p>
                    </div>
                    <div className="domain__card__right">
                        <img src={Technical} alt='technical' className="domain__card__image"></img>
                    </div>
                </div>
                <div className="domain__card flex__center card__reverse">
                    <div className="domain__card__left">
                        <h1 className="domain__card__heading">Creatives</h1>
                        <p className="domain__card__info">Codechef SRM KTR Chapter is a Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,</p>
                    </div>
                    <div className="domain__card__right">
                        <img src={Creatives} alt='technical' className="domain__card__image"></img>
                    </div>
                </div>
                <div className="domain__card flex__center">
                    <div className="domain__card__left">
                        <h1 className="domain__card__heading">Corporate</h1>
                        <p className="domain__card__info">Codechef SRM KTR Chapter is a Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,</p>
                    </div>
                    <div className="domain__card__right">
                        <img src={Corporate} alt='technical' className="domain__card__image"></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Domains
