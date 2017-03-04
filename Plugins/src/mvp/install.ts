﻿interface DCore {
    useMVP(): DCore;
    mvp: MVPPlugin;
}

interface DSandbox {
    asMVPModel<T>(target: T): T & dcore.plugins.mvp.Model;
}

interface MVPPlugin {
    Model: typeof dcore.plugins.mvp.Model;
    asMVPModel<T>(target: T): T & MVPModel;
    ModelEvents: {
        Change: string,
        Destroy: string
    };
    Collection: typeof dcore.plugins.mvp.Collection;
    CollectionEvents: {
        AddedItems: string,
        DeletedItems: string,
        UpdatedItem: string
    };
    View: typeof dcore.plugins.mvp.View;
    Presenter: typeof dcore.plugins.mvp.Presenter;
}

namespace dcore {
    "use strict";

    import mvp = plugins.mvp;

    export interface Instance {
        useMVP(): DCore;
        mvp: MVPPlugin;
    }

    export interface DefaultSandbox {
        asMVPModel<T>(target: T): T & MVPModel;
    }

    Instance.prototype.useMVP = function (this: DCore): DCore {
        if (this.mvp) {
            console.warn("MVP plugin has been already installed");
            return this;
        }

        this.mvp = {
            Model: mvp.Model,
            asMVPModel: mvp.asModel,
            ModelEvents: mvp.ModelEvents,
            Collection: mvp.Collection,
            CollectionEvents: mvp.CollectionEvents,
            View: mvp.View,
            Presenter: mvp.Presenter,
        };
        this.Sandbox.prototype.asMVPModel = mvp.asModel;
        return this;
    };
}