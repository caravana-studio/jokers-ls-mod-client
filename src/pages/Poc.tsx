export const Poc = () => {
  return (
    <main className="scanlines">
      <div className="screen">
        <canvas id="canvas" className="picture"></canvas>
        <div className="overlay">
          <div className="text">
            <span>AV-1</span>
          </div>
          <div className="menu">
            <header>Main Menu</header>
            <ul>
              <li className="active">
                <a href="#" title="">
                  Picture
                </a>
              </li>
              <li>
                <a href="#" title="">
                  Sound
                </a>
              </li>
              <li>
                <a href="#" title="">
                  About
                </a>
              </li>
              <li>
                <a href="#" title="">
                  Contact
                </a>
              </li>
            </ul>
            <footer>
              <div className="key">
                Exit: <span>1</span>
              </div>
              <div className="key">
                Select: <span>2</span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
};
