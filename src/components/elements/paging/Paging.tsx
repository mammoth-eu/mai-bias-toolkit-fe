import React from "react";
import { Page } from "./model";


interface Props {
    pages: Page[] | undefined,
    currentPage: Page,
    previousPage: any,
    nextPage: any,
    gotoPage: any
}


const Paging: React.FC<Props> = ({
                                     pages = [],
                                     currentPage,
                                     previousPage,
                                     nextPage,
                                     gotoPage
                                 }) => {

    const hideThreshold = 5;

    const showEllipsis = () => {
        return pages.length > hideThreshold && currentPage.index > 2;
    };

    const showPageNumber = (page: Page) => {
        // always hide first and last page, since we render them manually
        if (isFirstPage(page) || isLastPage(page)) {
            return false;
        } else {
            return pages.length <= hideThreshold || (page.index >= currentPage.index - 1 && page.index <= currentPage.index + 1);
        }
    };

    const showDots = () => {
        return pages.length > hideThreshold && currentPage.index < pages.length - 3;
    };

    const showLastpage = () => {
        return pages.length > 1
    };
    const isCurrentPage = (page: Page) => {
        return page.index === currentPage.index;
    };
    const isFirstPage = (page: Page) => {
        return page.index === 0;
    };
    const isLastPage = (page: Page) => {
        return page.index === pages.length - 1;
    };

    if (pages && pages.length > 1) {
        return (
            <div>
                <hr className="is-marginless"/>
                <div className="panel no-m-bottom">
                    <nav className="pagination is-centered" role="navigation" aria-label="pagination">

                        <a className={'pagination-previous button' + (isFirstPage(currentPage) ? ' is-static' : '')}
                           onClick={() => previousPage()}>Previous</a>

                        <a className={'pagination-next button' + (isLastPage(currentPage) ? ' is-static' : '')}
                           onClick={() => nextPage()}>Next page</a>

                        <ul className="pagination-list">
                            <li>
                                <a className={'pagination-link ' + (isFirstPage(currentPage) ? ' is-current' : '')}
                                   onClick={() => gotoPage(0)}
                                   aria-label="Goto page 1">1</a>
                            </li>

                            {showEllipsis() && <li><span className="pagination-ellipsis">&hellip;</span></li>}

                            {pages.map((page, i) => {
                                if (showPageNumber(page)) {
                                    return (
                                        <li key={'p_' + page.index}>
                                            <a className={'pagination-link' + (isCurrentPage(page) ? ' is-current' : '')}
                                               onClick={() => gotoPage(page.index)}
                                               aria-label={'Page ' + page.label}
                                               aria-current="page">{page.label}</a>
                                        </li>)
                                }
                                return <React.Fragment key={i}/>
                            })}

                            {showDots() && <li>< span className="pagination-ellipsis">&hellip;</span></li>}

                            {showLastpage() &&
                                <li>
                                    <a className={'pagination-link ' + (isLastPage(currentPage) ? ' is-current' : '')}
                                       onClick={() => gotoPage(pages.length - 1)}
                                       aria-label={'Goto page ' + pages.length}>{pages.length}</a>
                                </li>
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        )
    } else {
        return (<div/>)
    }
};
export default Paging;