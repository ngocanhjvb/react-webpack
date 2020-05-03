import React, {Component} from 'react';

class HomePage extends Component {
    testLazyLoad = () => {
        import(/* webpackChunkName: "print" */ './print').then(module => {
            const print = module.default;
            print();
        });
    }


    render() {
        return (
            <div className="container">
                <h1>Trang Chủ</h1>
                <button onClick={this.testLazyLoad}>Test Lazy loading</button>
            </div>
        );
    }
}

export default HomePage;
