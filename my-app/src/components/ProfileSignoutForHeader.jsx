import { useEffect, useRef, useState } from "react";
import { ProfileDropDownMenu } from "./ProfileDropDownMenu";
import { ProfileSignoutForHeaderShimmer } from "./shimmerUi/ProfileSignoutForHeaderShimmer";

export const ProfileSignout = () => {
  const [videoLoad, setVideoLoad] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const videoRef = useRef(null);
  const reverseTimer = useRef(null);

  useEffect(() => {
    setVideoLoad(true);

    return () => {
      if (reverseTimer.current) clearInterval(reverseTimer.current);
    };
  }, []);

  const handleShowMenu = function (flag) {
    if (flag === "toggle") setShowMenu(!showMenu);
    else setShowMenu(flag);
  };

  const playForward = function () {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = 2;
    if (reverseTimer.current) {
      clearInterval(reverseTimer.current);
      reverseTimer.current = null;
    }
    v.play();
  };

  const playBackward = function () {
    const v = videoRef.current;
    if (!v) return;
    v.pause();

    reverseTimer.current = setInterval(() => {
      if (v.currentTime >= 0.05) {
        v.currentTime = Math.max(0, v.currentTime - 0.033);
      } else {
        clearInterval(reverseTimer.current);
        reverseTimer.current = null;
      }
    }, 33);
  };

  return (
    <div className="relative">
      <div
        onClick={() => handleShowMenu("toggle")}
        // onMouseLeave={() => handleShowMenu(false)}
        className="flex items-center gap-2"
      >
        {!videoLoad && (
          <div>
            <ProfileSignoutForHeaderShimmer />
          </div>
        )}

        <video
          ref={videoRef}
          className={`w-14 h-14 ${videoLoad ? "opacity-100" : "opacity-50"}`}
          muted
          preload="auto"
        >
          <source src="/profileMonkeyyy.mp4" type="video/mp4"></source>
        </video>
        <div className="pointer-events-none text-gray-300">
          {showMenu ? "▲" : "▼"}
        </div>
      </div>
      {showMenu && (
        <div
          onMouseEnter={() => handleShowMenu(true)}
          onMouseLeave={() => handleShowMenu(false)}
          className="absolute right-10 "
        >
          <ProfileDropDownMenu
            playForward={playForward}
            playBackward={playBackward}
          />
        </div>
      )}
    </div>
  );
};
