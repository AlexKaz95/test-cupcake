function Values({ title, data }) {

  return (
    <div className="column">
      <div className="title">{title}</div>
      {/* { Object.entries(data).map( (item, i) => <div key={i} className='value'>{+item[1].toFixed(3)}</div> )} */}
    </div>
  );

}

export default Values;
