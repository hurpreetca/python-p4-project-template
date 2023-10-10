import React from "react";
import { useHistory } from "react-router-dom";
import "./Home.css";

function Home({ isLoggedIn }) {
  console.log(isLoggedIn);
  const navigate = useHistory();
  return (
    <div className="main-container">
      <div className="bg-img">
        <div className="welcome-page-container">
          <div className="welcome-box">
            <div className="title">
              <h2>Pocket-Reddit 💬</h2>
            </div>
            <div className="welcome-page-text">
              <h2 className="header">
                "Empowering Voices, Enriching Conversations: Join the
                Pocket-Reddit!"
              </h2>
              <br />
              <br />
              <div className="text-body">
                <h4>Rules and Regulations</h4>
                <ul>
                  <li>
                    <strong>Respectful Language:</strong> Always use respectful
                    and polite language when communicating with others. Avoid
                    using offensive or derogatory language.
                  </li>
                  <li>
                    <strong>No Hate Speech:</strong> Do not engage in hate
                    speech, discrimination, or harassment based on race,
                    religion, gender, sexual orientation, or any other personal
                    characteristics.
                  </li>

                  <li>
                    <strong>No Spamming:</strong> Do not post spam or
                    promotional content unrelated to the discussion. This
                    includes excessive self-promotion or advertising.
                  </li>
                  <li>
                    <strong>No Trolling:</strong> Do not purposefully provoke or
                    incite others for the purpose of causing disruption or
                    conflict. Respect different opinions.
                  </li>

                  <li>
                    <strong>Privacy:</strong> Do not share personal information
                    about yourself or others, such as addresses, phone numbers,
                    or private messages, without consent.
                  </li>

                  <li>
                    <strong>Report Inappropriate Content:</strong> If you come
                    across content that violates forum rules, report it to the
                    moderators.
                  </li>
                  <li>
                    <strong>Be Open to Feedback:</strong> Be open to
                    constructive feedback and criticism from others. Engage in
                    discussions with a willingness to learn.
                  </li>

                  <li>
                    <strong>Keep it Civil:</strong> Disagreements are natural,
                    but keep discussions civil and avoid personal attacks.
                  </li>
                  <li>
                    <strong>Stay Safe:</strong> Be cautious when sharing
                    personal information or interacting with strangers online.
                    Your safety is important.
                  </li>
                  <li>
                    <strong>Follow Forum Guidelines:</strong> Familiarize
                    yourself with the specific guidelines of the forum you're
                    participating in and adhere to them.
                  </li>
                  <li>
                    <strong>Community Guidelines:</strong> Respect and follow
                    the community guidelines and terms of service provided by
                    the platform hosting the forum.
                  </li>
                </ul>
              </div>
            </div>
            <div className="get-started"></div>

            <div className="button-container">
              {!isLoggedIn ? (
                <>
                  <button
                    type="button"
                    className="signup-button"
                    onClick={() => navigate.push("/login")}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    className="signup-button"
                    onClick={() => navigate.push("/signup")}
                  >
                    Signup
                  </button>
                </>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
