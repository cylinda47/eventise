module.exports = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.75)'
  },
  content : {
    position                   : 'absolute',
    top                        : '100px',
    left                       : '50%',
    transform                  : 'translateX(-50%)',
    border                     : '1px solid #ccc',
    background                 : '#f8f8fa',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '0px',
    opacity                    : '0',
    transition                 : 'opacity 1s', 
    width                      : '720px',
    height                     : '430px'
  }
}