import { Component } from 'react';

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ['http://pets-images.dev-apis.com/pets/none.jpg'],
  };

  handleIndexClick = (e) => {
    this.setState({
      active: +e.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="w-60">
        <img
          className="rounded-full p-4"
          src={images[active]}
          alt="animal hero"
        />
        <div className="flex gap-4 p-4">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              onClick={this.handleIndexClick}
              data-index={index}
              key={photo}
              src={photo}
              className={`${index === active ? 'border-4 border-black' : ''} rounded-full`}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
