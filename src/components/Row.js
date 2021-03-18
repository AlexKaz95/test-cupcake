function Row({ item, valuesMin }){
    return(
        <div className='row'>
          <div className='title' key={item}>{item[0]}</div>
          <div className={valuesMin[item[0]] === 'first'?'value-min':'value'}>{+item[1].first.toFixed(3)}</div>
          <div className={valuesMin[item[0]] === 'second'?'value-min':'value'}>{+item[1].second.toFixed(3)}</div>
          <div className={valuesMin[item[0]] === 'third'?'value-min':'value'}>{+item[1].third.toFixed(3)}</div>
        </div>
    )
}

export default Row;