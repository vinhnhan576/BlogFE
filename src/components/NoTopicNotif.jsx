import React from 'react'

const NoTopicNotif = ({onCloseButtonClick}) => {
  return (
      <div className="no-topic">
          <div className="no-topic__notif">
              <div>bitch you dont have any topics yet</div>
              <div className="no-topic__notif__create-button">create one</div>
          </div>
          <div className="no-topic__close-button" onClick={onCloseButtonClick}>
              x
          </div>
      </div>
  );
}

export default NoTopicNotif