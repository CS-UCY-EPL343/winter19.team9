import React, {Component} from 'react';
import '../assets/styles/ButtonLoader.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner, faSearch} from '@fortawesome/free-solid-svg-icons';

class ButtonLoader extends Component {
    render() {
        return (
            <div>
                {this.props.onClick ?
                    (
                        <button data-testid={'button'} className={'loading-button' + (this.props.className
                            || '')}
                                disabled={this.props.loading}
                                type={this.props.type || 'button'}
                                onClick={this.props.onClick}
                        >
                            {this.props.loading && (
                                <FontAwesomeIcon icon={faSpinner}
                                                 size={this.props.size || 'sm'}
                                                 spin
                                />
                            )}
                            {this.props.loading &&
                            <span>{this.props.loadingText}</span>}
                            {!this.props.loading && <span>{this.props.textIcon
                                ? <FontAwesomeIcon icon={faSearch}
                                                   size={this.props.size || 'sm'}
                                />
                                : this.props.text}</span>}
                        </button>
                    ) :
                    (
                        <button data-testid={'button'} className={'loading-button' + (this.props.className
                            || '')}
                                disabled={this.props.loading}
                                type={this.props.type || 'button'}
                        >
                            {this.props.loading && (
                                <FontAwesomeIcon icon={faSpinner}
                                                 size={this.props.size || 'sm'}
                                                 spin
                                />
                            )}
                            {this.props.loading &&
                            <span>{this.props.loadingText}</span>}
                            {!this.props.loading && <span>{this.props.textIcon
                                ? <FontAwesomeIcon icon={faSearch}
                                                   size={this.props.size || 'sm'}
                                />
                                : this.props.text}</span>}
                        </button>
                    )
                }
            </div>
        );
    }
}

export default ButtonLoader;