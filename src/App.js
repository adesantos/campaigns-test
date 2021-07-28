import React, { useEffect, useState, useRef } from 'react';
import './css/App.css';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { saveAs } from 'file-saver';
import { getCampaigns } from './actions/campaigns';
import { Player, BigPlayButton, ControlBar } from 'video-react';

function App(props) {
  const dispatch = useDispatch();
  const campaigns = props.campaigns? props.campaigns : null;

  useEffect(() => {
    dispatch(getCampaigns());
  }, []);

  return (
    <div className="app container">
      <header className="app-header">
        <i className="fas fa-bars"></i>
        <p>PLUGS</p>
      </header>

      <section className="row">

        {campaigns?(
          campaigns.map((row) => (
            <div key={row.id} className="campaign col-12">

                <div className="campaign-header col-12">
                  <div className="campaign-logo">
                    <img src={row.campaign_icon_url} />
                  </div>
                  <div className="campaign-info">
                    <p className="name">{row.campaign_name}</p>
                    <p className="installs">{row.pay_per_install} <span> per install</span></p>
                  </div>
                </div>

                <div className="campaign-body col-12">

                    {row.medias?(
                      row.medias.map((medias, i) => (
                        <div className="media-wrapper">

                          <div className="media">
                            {medias.media_type === "video"?(
                              <Player preload="auto" fluid={false} width={101} height={179}>
                                <source src={medias.download_url} type="video/mp4"/>
                                <BigPlayButton position="center" />
                                <ControlBar className="controls"/>
                              </Player>
                            ): 
                              <img width="101" height="179" src={medias.cover_photo_url} />
                            }
                          </div>
                          <div className="media-buttons">
                            <i className="copyLink fas fa-link" onClick={() => {navigator.clipboard.writeText(medias.tracking_link)}} data-link={medias.tracking_link}></i>
                            <a className="download" href={medias.download_url} target="_blank" download="video.mp4"><i className="fas fa-download"></i></a>
                          </div>
                        </div>
                      ))
                    ):null}           
                </div>

            </div>
          ))
        ):null}
        

      </section>

    </div>
  );
}

export default connect((state) => state.campaigns)(App);