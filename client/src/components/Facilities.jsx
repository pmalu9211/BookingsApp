export default function Facilities({ selected, changeHandler }) {
  const handleCB = (ev) => {
    if (ev.target.checked) {
      changeHandler((list) => {
        //console.log(list);
        return [...list, ev.target.name];
      });
    } else {
      changeHandler((list) => {
        return list.filter((value) => value != ev.target.name);
      });
    }
    //console.log(selected);
    //console.log(ev.target.checked);
  };

  return (
    <>
      <h2>Check the facilities *</h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-16 gap-y-6 mt-8">
        <div className="flex gap-2 px-1 py-4 border border-gray-300 rounded-2xl justify-center text-xl items-center">
          <input
            type="checkbox"
            checked={selected.includes("Wifi")}
            name="Wifi"
            onChange={handleCB}
          />
          Wifi
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
            />
          </svg>
        </div>
        <div className="flex gap-2 px-1 py-4 border border-gray-300 rounded-2xl justify-center text-xl items-center">
          <input
            type="checkbox"
            checked={selected.includes("TV")}
            name="TV"
            onChange={handleCB}
          />
          TV
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"
            />
          </svg>
        </div>
        <div className="flex gap-2 px-1 py-4 border border-gray-300 rounded-2xl justify-center text-xl items-center">
          <input
            type="checkbox"
            checked={selected.includes("Parking")}
            name="Parking"
            onChange={handleCB}
          />
          Free Parking
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
            />
          </svg>
        </div>
        <div className="flex gap-2 px-1 py-4 border border-gray-300 rounded-2xl justify-center text-xl items-center">
          <input
            type="checkbox"
            checked={selected.includes("Water")}
            name="Water"
            onChange={handleCB}
          />
          Water
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="2.5rem"
            width="2.5rem"
          >
            <path d="M18.08 7a1 1 0 00-1.08.92l-.35 4.55a2.67 2.67 0 01-1.2-.77 1 1 0 00-1.5 0 2.65 2.65 0 01-3.9 0 1 1 0 00-1.5 0 2.7 2.7 0 01-1.2.77L7 7.92A1 1 0 005.92 7 1 1 0 005 8.08l.86 11.15a3 3 0 003 2.77h6.3a3 3 0 003-2.77L19 8.08A1 1 0 0018.08 7zm-1.94 12.08a1 1 0 01-1 .92H8.85a1 1 0 01-1-.92L7.5 14.5a4.77 4.77 0 001.8-.79 4.66 4.66 0 005.4 0 4.77 4.77 0 001.8.79zM12 10a3.26 3.26 0 003.25-3.25c0-2.75-2.58-4.51-2.69-4.58a1 1 0 00-1.12 0c-.11.08-2.69 1.83-2.69 4.58A3.26 3.26 0 0012 10zm0-5.7a3.61 3.61 0 011.25 2.45 1.25 1.25 0 01-2.5 0A3.66 3.66 0 0112 4.3z" />
          </svg>
        </div>
        <div className="flex gap-2 px-1 py-4 border border-gray-300 rounded-2xl justify-center text-xl items-center">
          <input
            type="checkbox"
            checked={selected.includes("Fan")}
            name="Fan"
            onChange={handleCB}
          />
          Fan
          <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            height="2.5rem"
            width="2.5rem"
          >
            <path d="M10 3c0 1.313-.304 2.508-.8 3.4a1.991 1.991 0 00-1.484-.38c-.28-.982-.91-2.04-1.838-2.969a8.368 8.368 0 00-.491-.454A5.976 5.976 0 018 2c.691 0 1.355.117 1.973.332.018.219.027.442.027.668zm0 5c0 .073-.004.146-.012.217 1.018-.019 2.2-.353 3.331-1.006a8.39 8.39 0 00.57-.361 6.004 6.004 0 00-2.53-3.823 9.02 9.02 0 01-.145.64c-.34 1.269-.944 2.346-1.656 3.079.277.343.442.78.442 1.254zm-.137.728a2.007 2.007 0 01-1.07 1.109c.525.87 1.405 1.725 2.535 2.377.2.116.402.222.605.317a5.986 5.986 0 002.053-4.111c-.208.073-.421.14-.641.199-1.264.339-2.493.356-3.482.11zM8 10c-.45 0-.866-.149-1.2-.4-.494.89-.796 2.082-.796 3.391 0 .23.01.457.027.678A5.99 5.99 0 008 14c.94 0 1.83-.216 2.623-.602a8.359 8.359 0 01-.497-.458c-.925-.926-1.555-1.981-1.836-2.96-.094.013-.191.02-.29.02zM6 8c0-.08.005-.16.014-.239-1.02.017-2.205.351-3.34 1.007a8.366 8.366 0 00-.568.359 6.003 6.003 0 002.525 3.839 8.37 8.37 0 01.148-.653c.34-1.267.94-2.342 1.65-3.075A1.988 1.988 0 016 8zm-3.347-.632c1.267-.34 2.498-.355 3.488-.107.196-.494.583-.89 1.07-1.1-.524-.874-1.406-1.733-2.541-2.388a8.363 8.363 0 00-.594-.312 5.987 5.987 0 00-2.06 4.106c.206-.074.418-.14.637-.199zM8 9a1 1 0 100-2 1 1 0 000 2z" />
            <path d="M8 15A7 7 0 118 1a7 7 0 010 14zm0 1A8 8 0 108 0a8 8 0 000 16z" />
          </svg>
        </div>
        <div className="flex gap-2 px-1 py-4 border border-gray-300 rounded-2xl justify-center text-xl items-center">
          <input
            type="checkbox"
            checked={selected.includes("Pets")}
            name="Pets"
            onChange={handleCB}
          />
          Pets
          <svg
            viewBox="0 0 576 512"
            fill="currentColor"
            height="2.5rem"
            width="2.5rem"
          >
            <path d="M309.6 158.5l23.1-138.7C334.6 8.4 344.5 0 356.1 0c7.5 0 14.5 3.5 19 9.5L392 32h52.1c12.7 0 24.9 5.1 33.9 14.1L496 64h56c13.3 0 24 10.7 24 24v24c0 44.2-35.8 80-80 80h-69.3l-5.1 30.5-112-64zM416 256.1V480c0 17.7-14.3 32-32 32h-32c-17.7 0-32-14.3-32-32V364.8c-24 12.3-51.2 19.2-80 19.2s-56-6.9-80-19.2V480c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V249.8c-28.8-10.9-51.4-35.3-59.2-66.5L1 167.8c-4.3-17.1 6.1-34.5 23.3-38.8s34.5 6.1 38.8 23.3l3.9 15.5C70.5 182 83.3 192 98 192h205.8L416 256.1zM464 80c0-8.8-7.2-16-16-16s-16 7.2-16 16 7.2 16 16 16 16-7.2 16-16z" />
          </svg>
        </div>
      </div>
    </>
  );
}
