
function PlaylistTableCmpt({playlistData}) {
  

  return (
    <div>
      {playlistData.map((playlistState, id) => {
        return (
          <ul key={id}>
            <li>
              <input type="checkbox" />
            </li>
            <li>{id + 1}</li>
            <li>{playlistState.name}</li>
          </ul>
        );
      })}
      <button >Download</button>
    </div>
  );
}

export default PlaylistTableCmpt;
