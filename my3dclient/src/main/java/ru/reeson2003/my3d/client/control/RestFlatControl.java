package ru.reeson2003.my3d.client.control;

import org.lwjgl.util.vector.Vector3f;
import ru.reeson2003.my3d.client.rest.RestLoader;
import ru.reeson2003.my3d.client.ticker.Ticker;
import ru.reeson2003.my3d.common.Geometry;

/**
 * Created by User on 20.10.2017.
 */
public class RestFlatControl extends FlatKeyboardMouseControl {
    private RestLoader loader = new RestLoader();
    private long id;

    public RestFlatControl(long id, float speed, Vector3f position, Vector3f yawPitchRoll, Ticker ticker) {
        super(speed, position, yawPitchRoll, ticker);
        this.id = id;
    }

    @Override
    public void tick() {
        super.tick();
        loader.updateEntity(id, convert());
    }

    private Geometry convert() {
        return new Geometry(getPosition().x, getPosition().y, getPosition().z,
                getRotX(), getRotY(), getRotZ(), 1);
    }
}
