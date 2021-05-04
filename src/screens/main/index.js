import React, { useState } from "react";
import Modal from "react-modal";
import ClipLoader from "react-spinners/ClipLoader";

import { wait } from "../../utils/time";
import * as api from "../../utils/api";
// API KEY
const api_key = "";

const Main = () => {
  const [trendingGifs, updateTrendingGifs] = useState([]);
  const [selectedGif, updateSelectedGif] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      let { data } = await api.get(
        `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}`
      );

      await wait(500);
      updateTrendingGifs(data.data);
    } catch (err) {
      alert(err);
    }
    setLoading(false);
  };

  const refreshData = async () => {
    updateTrendingGifs([]);
    setLoading(true);
    await wait(200);
    fetchData();
  };

  /**
   *
   */
  const handleImageClick = (gifData) => {
    openModal();
    updateSelectedGif(gifData);
  };

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="App-header">
      <div>
        {trendingGifs.length
          ? trendingGifs.map((gif) => {
              return (
                <img
                  src={gif.images.fixed_height.url}
                  onClick={() => handleImageClick(gif)}
                />
              );
            })
          : undefined}
      </div>
      {trendingGifs.length ? (
        <button onClick={refreshData} className="button">
          Refresh
        </button>
      ) : (
        <button onClick={fetchData} className="button">
          Load Trending Gifs
        </button>
      )}
      <Modal
        isOpen={modalIsOpen}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div>
          <button
            className="button"
            onClick={closeModal}
            style={{ width: "100px", margin: "0 10px 10px 0" }}
          >
            close
          </button>
          <img
            style={{ width: "100%" }}
            src={
              selectedGif.images &&
              selectedGif.images.original &&
              selectedGif.images.original.url
            }
          />
        </div>
      </Modal>
      <ClipLoader loading={loading} color={"#ffffff"} size={150} />
    </div>
  );
};

export default Main;
