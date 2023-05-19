import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

class Travel extends Component {
  state = {loader: true, travelData: []}

  componentDidMount() {
    this.getTravelImages()
  }

  getTravelImages = async () => {
    const url = 'https://apis.ccbp.in/tg/packages'

    const response = await fetch(url)
    const data = await response.json()
    const updateData = data.packages.map(each => ({
      id: each.id,
      name: each.name,
      imageUrl: each.image_url,
      description: each.description,
    }))

    this.setState({travelData: updateData, loader: false})
  }

  render() {
    const {loader, travelData} = this.state

    return (
      <div className="app-bg">
        <h1 className="app-heading"> Travel Guide</h1>

        {loader ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <ul className="travel-cards-ul">
            {travelData.map(eachOf => (
              <li key={eachOf.id} className="travel-card">
                <img
                  className="travel-img"
                  src={eachOf.imageUrl}
                  alt={eachOf.name}
                />
                <h1 className="travel-heading"> {eachOf.name}</h1>
                <p className="travel-des"> {eachOf.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default Travel
