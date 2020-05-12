import React from 'react'

const UserContext = React.createContext(true)

class UserProvider extends React.Component {
    constructor(props) {
        super(props);
        this.setUser = this.setUser.bind(this);
    }
    
    // Context state
    state = {
      user: {},
    }
  
    // Method to update state
    setUser = user => {
      this.setState(prevState => ({ user }))
      console.log(this.state)
    }
  
    render() {
      const { children } = this.props
      const { user } = this.state
      const { setUser } = this
  
      return (
        <UserContext.Provider
          value={{
            user,
            setUser,
          }}
        >
          {children}
        </UserContext.Provider>
      )
    }
  }
  
  export default UserContext
  
  export { UserProvider }