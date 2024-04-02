"use client"
import { Modal } from "react-responsive-modal";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-responsive-modal/styles.css";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

export default function ModalYoutubeVideo({
  currentVideo,
  isOpen,
  setIsOpen,
}: {
  currentVideo: string,
  isOpen: boolean,
  setIsOpen: (value: boolean) => void,
}) {

  const autoplayVideo = () => {
    const playBtnsArr = Array.from(document.getElementsByClassName("lty-playbtn"));
    if (playBtnsArr.length > 0) {
      const lastPlayBtn = playBtnsArr[playBtnsArr.length - 1];
      if (lastPlayBtn instanceof HTMLElement) {
        lastPlayBtn.click();
      }
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      showCloseIcon={false}
      center
      styles={{
        modal: {
          padding: 0,
        },
      }}
      blockScroll={false}
    >
      <div
        className="w-[800px]"
        onLoad={() => autoplayVideo()}
      >
        <LiteYouTubeEmbed
          id={currentVideo}
          title={`Psyhology video ${currentVideo}`}
          noCookie={true}
          poster="maxresdefault"
        />
      </div>
    </Modal>
  );
}
