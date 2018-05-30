// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import PropTypes from 'prop-types';
import React from 'react';

import messageHtmlToComponent from 'utils/message_html_to_component';
import * as TextFormatting from 'utils/text_formatting.jsx';

export default class Markdown extends React.PureComponent {
    static propTypes = {

        /*
         * An object mapping channel names to channels for the current team
         */
        channelNamesMap: PropTypes.object.isRequired,

        /*
         * An array of custom URL schemes that should be turned into links
         */
        customUrlSchemes: PropTypes.array,

        /*
         * Whether or not to do Markdown rendering
         */
        enableFormatting: PropTypes.bool.isRequired,

        /*
         * Whether or not this text is part of the RHS
         */
        isRHS: PropTypes.bool,

        /*
         * An array of words that can be used to mention a user
         */
        mentionKeys: PropTypes.arrayOf(PropTypes.object).isRequired,

        /*
         * The text to be rendered
         */
        message: PropTypes.string.isRequired,

        /*
         * Any additional text formatting options to be used
         */
        options: PropTypes.object,

        /*
         * The root Site URL for the page
         */
        siteURL: PropTypes.string.isRequired,

        /*
         * The current team
         */
        team: PropTypes.object.isRequired,

        /**
         * If an image proxy is enabled.
         */
        hasImageProxy: PropTypes.bool.isRequired,

        /**
         * Whether or not to proxy image URLs
         */
        proxyImages: PropTypes.bool,
    };

    static defaultProps = {
        options: {},
        isRHS: false,
        proxyImages: true,
    };

    render() {
        if (!this.props.enableFormatting) {
            return <span>{this.props.message}</span>;
        }

        const options = Object.assign({
            customUrlSchemes: this.props.customUrlSchemes,
            siteURL: this.props.siteURL,
            mentionKeys: this.props.mentionKeys,
            atMentions: true,
            channelNamesMap: this.props.channelNamesMap,
            proxyImages: this.props.hasImageProxy && this.props.proxyImages,
            team: this.props.team,
        }, this.props.options);

        const htmlFormattedText = TextFormatting.formatText(this.props.message, options);
        return messageHtmlToComponent(htmlFormattedText, this.props.isRHS);
    }
}