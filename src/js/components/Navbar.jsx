var React = require('react');
var AuthActions = require('../actions/AuthActions');
var classnames = require('classnames');
var _ = require('lodash');
var { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Glyphicon } = require('react-bootstrap');


class CustomNavbar extends React.Component {
    logout(e) {
        AuthActions.logout();
        e.preventDefault();
    }

    itemClass = (ref, url) => {
        return classnames({active: _.includes(document.location.hash, ref) || document.location.hash == url})
    };

    renderLeftSide() {
        return (
            <Nav>
                <NavItem href="#/bundles" className={this.itemClass("bundles", "#/")}>Bundles</NavItem>
                <NavItem href="#/offers" className={this.itemClass("offers")}>Offers</NavItem>
                <NavItem href="#/vouchers" className={this.itemClass("vouchers")}>Vouchers</NavItem>
                <NavItem href="#/subscriptions" className={this.itemClass("subscriptions")}>Subscriptions</NavItem>
            </Nav>
        );
    };

    renderRightSide() {
        return (
            <Nav pullRight>
                <NavItem href="#" onClick={this.logout}>
                    Logout &nbsp;<Glyphicon glyph="log-out"></Glyphicon>
                </NavItem>
            </Nav>
        );
    };

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    { this.renderLeftSide() }
                    { this.renderRightSide() }
                </Navbar.Collapse>
            </Navbar>
        )
    };
}

module.exports = CustomNavbar;
