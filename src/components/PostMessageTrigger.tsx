import { useEffect, useState } from "react";

export const PostMessageTrigger = () => {
  const [windowToOpen, setWindowToOpen] = useState(
    "https://astonishing-torrone-744d87.netlify.app/"
  );
  const [logs, setLogs] = useState([]);

  const myWindowListener = (e) => {
    console.log("e");
    console.log(e);

    const newLogs = {
      message: e.data,
      timeStamp: new Date().toISOString(),
    };
    console.log(newLogs);

    setLogs((oldLogs) => {
      return [...oldLogs, newLogs];
    });
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setWindowToOpen(input);
  };

  const handleClick = () => {
    window.open(windowToOpen);
  };

  useEffect(() => {
    window.addEventListener("message", myWindowListener);

    return () => {
      window.removeEventListener("message", myWindowListener);
    };
  }, []);

  const byLatestFirst = (a, b) => (a.timeStamp > b.timeStamp ? -1 : 1);

  return (
    <>
      <h1>window.postMessage API</h1>
      <div style={{ display: "flex", gap: "32px" }}>
        <div>
          <h2>Logs</h2>
          <ul style={{ textAlign: "left" }}>
            <pre>{logs && JSON.stringify(logs, null, 2)}</pre>
            {logs.sort(byLatestFirst).map((log) => (
              <li key={log.timeStamp}>
                <b>{log.timeStamp}</b>: {log.message}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Info</h2>
          <label>
            Window to open{" "}
            <input
              style={{ width: "100%" }}
              autoFocus
              onChange={handleInputChange}
              type="text"
              value={windowToOpen}
            />
          </label>
          <hr />
          <button onClick={handleClick}>
            Click to open new tab with{" "}
            <pre>window.open("{windowToOpen}")</pre>
          </button>
          <hr />
          <div>
            This page has an event listener defined as{" "}
            <pre>
              window.addEventListener("message", (e) =&gt; handleEvent(e))
            </pre>{" "}
            which showcases how to use the <pre>window.opener.postMessage()</pre>{" "}
            browser API
          </div>
        </div>
      </div>
    </>
  );
};
