import React from 'react';
import ReviewCard from './ReviewCard';

const TourDetails = ({ tour, user }) => {
  // Helper function to format the date
  const formatDate = (date) =>
    new Date(date).toLocaleString('en-us', { month: 'long', year: 'numeric' });

  return (
    <>
      {/* Head Section */}
      <head>
        <script src="https://api.mapbox.com/mapbox-gl-js/v0.54.0/mapbox-gl.js"></script>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v0.54.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </head>

      {/* Header Section */}
      <section className="section-header">
        <div className="header__hero">
          <div className="header__hero-overlay">&nbsp;</div>
          <img
            className="header__hero-img"
            src={`/img/tours/${tour.imageCover}`}
            alt={`${tour.name}`}
          />
        </div>

        <div className="heading-box">
          <h1 className="heading-primary">
            <span>{`${tour.name} tour`}</span>
          </h1>
          <div className="heading-box__group">
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="/img/icons.svg#icon-clock"></use>
              </svg>
              <span className="heading-box__text">{`${tour.duration} days`}</span>
            </div>
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
              </svg>
              <span className="heading-box__text">
                {tour.startLocation.description}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="section-description">
        <div className="overview-box">
          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
            <OverviewBox
              label="Next date"
              text={formatDate(tour.startDates[0])}
              icon="calendar"
            />
            <OverviewBox
              label="Difficulty"
              text={tour.difficulty}
              icon="trending-up"
            />
            <OverviewBox
              label="Participants"
              text={`${tour.maxGroupSize} people`}
              icon="user"
            />
            <OverviewBox
              label="Rating"
              text={`${tour.ratingsAverage} / 5`}
              icon="star"
            />
          </div>

          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
            {tour.guides.map((guide, index) => (
              <div className="overview-box__detail" key={index}>
                <img
                  className="overview-box__img"
                  src={`/img/users/${guide.photo}`}
                  alt={guide.name}
                />
                <span className="overview-box__label">
                  {guide.role === 'lead-guide' ? 'Lead guide' : 'Tour guide'}
                </span>
                <span className="overview-box__text">{guide.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="description-box">
          <h2 className="heading-secondary ma-bt-lg">{`About ${tour.name} tour`}</h2>
          {tour.description.split('\n').map((p, index) => (
            <p className="description__text" key={index}>
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Pictures Section */}
      <section className="section-pictures">
        {tour.images.map((img, i) => (
          <div className="picture-box" key={i}>
            <img
              className={`picture-box__img picture-box__img--${i + 1}`}
              src={`/img/tours/${img}`}
              alt={`The Park Camper Tour ${i + 1}`}
            />
          </div>
        ))}
      </section>

      {/* Map Section */}
      <section className="section-map">
        <div id="map" data-locations={JSON.stringify(tour.locations)}></div>
      </section>

      {/* Reviews Section */}
      <section className="section-reviews">
        <div className="reviews">
          {tour.reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-cta">
        <div className="cta">
          <div className="cta__img cta__img--logo">
            <img src="/img/logo-white.png" alt="Natours logo" />
          </div>
          <img
            className="cta__img cta__img--1"
            src={`/img/tours/${tour.images[1]}`}
            alt="Tour picture"
          />
          <img
            className="cta__img cta__img--2"
            src={`/img/tours/${tour.images[2]}`}
            alt="Tour picture"
          />
          <div className="cta__content">
            <h2 className="heading-secondary">What are you waiting for?</h2>
            <p className="cta__text">{`${tour.duration} days. 1 adventure. Infinite memories. Make it yours today!`}</p>
            {user ? (
              <button
                className="btn btn--green span-all-rows"
                id="book-tour"
                data-tour-id={tour.id}
              >
                Book tour now!
              </button>
            ) : (
              <a className="btn btn--green span-all-rows" href="/login">
                Log in to book tour
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

const OverviewBox = ({ label, text, icon }) => (
  <div className="overview-box__detail">
    <svg className="overview-box__icon">
      <use xlinkHref={`/img/icons.svg#icon-${icon}`}></use>
    </svg>
    <span className="overview-box__label">{label}</span>
    <span className="overview-box__text">{text}</span>
  </div>
);

export default TourDetails;
